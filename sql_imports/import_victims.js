import importData from './base_import.js';
import { parseValue } from '../handlers/utils.js';

/* Note, if const has 1 as an argument to the parseValue function, it is due to discrepancy in original database, where IDs started at 0. We want them to start at 1 in our database. */

const processVictimRow = async (row, pool) => {
  try {
    const case_id = parseValue(row['Case #'], parseInt);
    const victim_name = row['Victim Name'] || null;
    const age = parseValue(row['Age'], parseInt);
    const gender_id = parseValue(row['Gender'], parseInt, 1);
    const race_id = parseValue(row['Race'], parseInt, 1);
    const victim_knew_shooter_status_id = parseValue(row['Knew Shooter'], parseInt, 1);
    const relationship_to_shooter_details = row['If Known, Relationship to Shooter'] || null;
    const victim_relationship_id = parseValue(row['Relationship to Shooter'], parseInt, 1);
    const life_expectancy = parseValue(row['Life Expectancy'], parseFloat);
    const years_lost = parseValue(row['Years Lost'], parseFloat);

    const checkVictimQuery = `
      SELECT victim_id FROM victims WHERE victim_name = $1 AND age = $2 AND gender_id = $3 AND race_id = $4
    `;
    const checkVictimValues = [victim_name, age, gender_id, race_id];

    const result = await pool.query(checkVictimQuery, checkVictimValues);
    
    let queries = [];

    if (result.rows.length > 0) {
      // Victim already exists, insert a new row in case_victims table
      const victim_id = result.rows[0].victim_id;

      const query = `
        INSERT INTO case_victims (case_id, victim_id) VALUES ($1, $2)
      `;
      const values = [case_id, victim_id];

      queries.push({ query, values });
    } else {
      const insertVictimQuery = `
        INSERT INTO victims (
          victim_name, age, gender_id, race_id, victim_knew_shooter_status_id, relationship_to_shooter_details, victim_relationship_id, life_expectancy, years_lost
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING victim_id
      `;
      const insertVictimValues = [
        victim_name, age, gender_id, race_id, victim_knew_shooter_status_id, relationship_to_shooter_details, victim_relationship_id, life_expectancy, years_lost
      ];

      const insertResult = await pool.query(insertVictimQuery, insertVictimValues);
      const victim_id = insertResult.rows[0].victim_id;

      // Insert into case_victims table with the new victim_id
      const query = `
        INSERT INTO case_victims (case_id, victim_id) VALUES ($1, $2)
      `;
      const values = [case_id, victim_id];

      queries.push({ query, values });

      return queries;
    };
  } catch (error) {
    console.error('Error processing victim row:', error);
    return [];
  }
};

const importVictims = async (pool) => {
  await importData(pool, './sql_imports/csv/victims.csv', async (row) => {
    return await processVictimRow(row, pool);
  });
};

export default importVictims;
