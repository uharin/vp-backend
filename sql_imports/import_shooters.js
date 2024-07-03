import { parseValue } from '../handlers/utils.js';
import importData from './base_import.js';
import insertChildhoodTrauma from './import_childhood_traumas.js';
import insertGrievancesAndMotivations from './import_grievances.js';
import insertHealthAndMentalHealth from './import_healths.js';
import insertShooterDemographics from './import_shooter_demographics.js';
import insertSignsOfCrisis from './import_signs_of_crisis.js';
import insertViolenceAndCrimes from './import_violence_and_crimes.js';

const processShooterRow = async (row, pool) => {
  try {
    const case_id = parseValue(row['Case #'], parseInt, { offset: 0 });
    const first_name = row['Shooter First Name'] || null;
    const last_name = row['Shooter Last Name'] || null;

    // Check if shooter already exists
    const checkShooterQuery = `
      SELECT shooter_id FROM shooters WHERE first_name = $1 AND last_name = $2
    `;
    const checkShooterValues = [first_name, last_name];
    const result = await pool.query(checkShooterQuery, checkShooterValues);

    let queries = [];

    if (result.rows.length > 0) {
      // Shooter already exists, insert a new row in case_shooters table
      const shooter_id = result.rows[0].shooter_id;

      const query = 'INSERT INTO case_shooters (case_id, shooter_id) VALUES ($1, $2)';
      const values = [case_id, shooter_id];

      queries.push({ query, values });
    } else {
      // Insert data into related tables
      const childhood_trauma_id = await insertChildhoodTrauma(row, pool);
      const grievances_and_motivations_id = await insertGrievancesAndMotivations(row, pool);
      const health_and_mental_health_id = await insertHealthAndMentalHealth(row, pool);
      const shooter_demographics_id = await insertShooterDemographics(row, pool);
      const signs_of_crisis_id = await insertSignsOfCrisis(row, pool);
      const violence_and_crimes_id = await insertViolenceAndCrimes(row, pool);

      // Insert new shooter
      const insertShooterQuery = `
        INSERT INTO shooters (
          first_name, last_name, childhood_trauma_id, grievances_and_motivations_id, health_and_mental_health_id, shooter_demographics_id, signs_of_crisis_id, violence_and_crimes_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING shooter_id
      `;
      const insertShooterValues = [
        first_name,
        last_name,
        childhood_trauma_id,
        grievances_and_motivations_id,
        health_and_mental_health_id,
        shooter_demographics_id,
        signs_of_crisis_id,
        violence_and_crimes_id,
      ];

      const insertResult = await pool.query(insertShooterQuery, insertShooterValues);
      const shooter_id = insertResult.rows[0].shooter_id;

      // Insert into case_shooters table with the new shooter_id
      const query = 'INSERT INTO case_shooters (case_id, shooter_id) VALUES ($1, $2)';
      const values = [case_id, shooter_id];

      queries.push({ query, values });

      return queries;
    }
  } catch (error) {
    console.error('Error processing shooter row:', error);
    return [];
  }
};

const importShooters = async (pool) => {
  await importData(pool, './sql_imports/csv/shooters.csv', async (row) => {
    return await processShooterRow(row, pool);
  });
};

export default importShooters;
