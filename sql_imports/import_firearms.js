import importData from './base_import.js';
import { convertToBoolean, parseValue } from '../handlers/utils.js';

/* 
  Note: { offset: 0 } is due to discrepancy in original database, where IDs started at 0. 
  By default, we offset them by 1 in parseValue function. So if a value does *not* need to be offset, we must declare that here.
*/

const processFirearmsRow = async (row, pool) => {
  try {
    const case_id = parseValue(row['Case #'], parseInt, { offset: 0 });
    const make_and_model = row['Make and Model'] || null;
    const firearm_classification_id = parseValue(row['Classification'], parseInt);
    const caliber_id = parseValue(row['Caliber'], parseInt);
    const used_in_shooting = convertToBoolean(row['Used in Shooting?']);
    const modified = convertToBoolean(row['Modified']);
    const large_capacity_magazine = convertToBoolean(row['Large Capacity Magazine']);
    const extended_magazine = convertToBoolean(row['Extended Magazine']);
    const firearm_purchase_timeframe_id = parseValue(row['When Obtained'], parseInt);
    const firearm_legal_purchase_id = parseValue(row['Legal Purchase'], parseInt);
    const firearm_illegal_purchase_id = parseValue(row['Illegal Purchase'], parseInt);
    const assembled_with_legal_parts = convertToBoolean(row['Assembled with Legal Parts']);
    const gifted = convertToBoolean(row['Gifted']);
    const firearm_theft_id = parseValue(row['Theft'], parseInt);
    const unknown = convertToBoolean(row['Unknown']);

    // Check if firearm already exists
    const checkFirearmQuery = `
      SELECT firearm_id FROM firearms WHERE make_and_model = $1 AND firearm_classification_id = $2 AND caliber_id = $3 AND used_in_shooting = $4 AND modified = $5 AND large_capacity_magazine = $6 AND extended_magazine = $7 AND firearm_purchase_timeframe_id = $8 AND firearm_legal_purchase_id = $9 AND firearm_illegal_purchase_id = $10 AND assembled_with_legal_parts = $11 AND gifted = $12 AND firearm_theft_id = $13 AND unknown = $14
    `;
    const checkFirearmValues = [
      make_and_model,
      firearm_classification_id,
      caliber_id,
      used_in_shooting,
      modified,
      large_capacity_magazine,
      extended_magazine,
      firearm_purchase_timeframe_id,
      firearm_legal_purchase_id,
      firearm_illegal_purchase_id,
      assembled_with_legal_parts,
      gifted,
      firearm_theft_id,
      unknown
    ];

    const result = await pool.query(checkFirearmQuery, checkFirearmValues);

    let queries = [];

    let firearm_id;
    if (result.rows.length > 0) {
      // Firearm already exists
      firearm_id = result.rows[0].firearm_id;
    } else {
      // Insert new firearm
      const insertFirearmQuery = `
        INSERT INTO firearms (
          make_and_model, firearm_classification_id, caliber_id, used_in_shooting, modified, large_capacity_magazine, extended_magazine, firearm_purchase_timeframe_id, firearm_legal_purchase_id, firearm_illegal_purchase_id, assembled_with_legal_parts, gifted, firearm_theft_id, unknown
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING firearm_id
      `;
      const insertFirearmValues = [
        make_and_model,
        firearm_classification_id,
        caliber_id,
        used_in_shooting,
        modified,
        large_capacity_magazine,
        extended_magazine,
        firearm_purchase_timeframe_id,
        firearm_legal_purchase_id,
        firearm_illegal_purchase_id,
        assembled_with_legal_parts,
        gifted,
        firearm_theft_id,
        unknown
      ];

      const insertResult = await pool.query(insertFirearmQuery, insertFirearmValues);
      firearm_id = insertResult.rows[0].firearm_id;
    }

    // Insert into case_firearms table with the new firearm_id
    const query = `
      INSERT INTO case_firearms (case_id, firearm_id) VALUES ($1, $2)
    `;
    const values = [case_id, firearm_id];

    queries.push({ query, values });

    return queries;
  } catch (error) {
    console.error('Error processing firearm row:', error);
    return [];
  }
};

const importFirearms = async (pool) => {
  await importData(pool, './sql_imports/csv/firearms.csv', async (row) => {
    return await processFirearmsRow(row, pool);
  });
};

export default importFirearms;