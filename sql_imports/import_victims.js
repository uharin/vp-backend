import importData from './base_import.js';
import { capitalize, parseValue } from '../handlers/utils.js';

/* 
  Note: { offset: 0 } is due to discrepancy in original database, where IDs started at 0. 
  By default, we offset them by 1 in parseValue function. So if a value does *not* need to be offset, we must declare that here.
*/

const processVictimRow = async (row, pool) => {
  try {
    const case_id = parseValue(row['Case #'], parseInt, { offset: 0 });
    const victim_name = row['Victim Name'] || null;
    const age = parseValue(row['Age'], parseInt, { offset: 0 });
    const gender_id = parseValue(row['Gender'], parseInt, { offset: row['Gender'] === '3' ? -1 : 1 }); // Conditional offset is because there is no '2' value in the data, only 0, 1, and 3
    const race_id = parseValue(row['Race'], parseInt);
    const victim_knew_shooter_status_id = parseValue(row['Knew Shooter'], parseInt);
    const relationship_to_shooter_details = capitalize(row['If Known, Relationship to Shooter']) || null;
    const victim_relationship_id = parseValue(row['Relationship to Shooter'], parseInt);
    const life_expectancy = parseValue(row['Life Expectancy'], parseFloat, { offset: 0 });
    const years_lost = parseValue(row['Years Lost'], parseFloat, { offset: 0 });

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
        victim_name,
        age,
        gender_id,
        race_id,
        victim_knew_shooter_status_id,
        relationship_to_shooter_details,
        victim_relationship_id,
        life_expectancy,
        years_lost,
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
    }
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
