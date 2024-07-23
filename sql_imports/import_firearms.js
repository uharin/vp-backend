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
    const firearm_legal_id = parseValue(row['Legal Purchase'], parseInt);
    const firearm_illegal_id = parseValue(row['Illegal Purchase'], parseInt);
    const assembled_with_legal_parts = convertToBoolean(row['Assembled with Legal Parts']);
    const gifted = convertToBoolean(row['Gifted']);
    const firearm_theft_id = parseValue(row['Theft'], parseInt);
    const unknown = convertToBoolean(row['Unknown']);

    
    // Attempt to insert a new firearm, on conflict do nothing

    let firearm_id;

    const upsertFirearmQuery = `
      INSERT INTO firearms (make_and_model) 
      VALUES ($1)
      ON CONFLICT (make_and_model) DO NOTHING
      RETURNING firearm_id
    `;
    const upsertFirearmValues = [make_and_model];

    const upsertResult = await pool.query(upsertFirearmQuery, upsertFirearmValues);

    if (upsertResult.rows.length > 0) {
      // New firearm inserted, get the new firearm_id
      firearm_id = upsertResult.rows[0].firearm_id;
    } else {
      // Firearm already exists, retrieve its firearm_id
      const selectFirearmQuery = `
        SELECT firearm_id FROM firearms WHERE make_and_model = $1
      `;
      const selectFirearmValues = [make_and_model];

      const selectResult = await pool.query(selectFirearmQuery, selectFirearmValues);
      firearm_id = selectResult.rows[0].firearm_id;
    }

    // Insert into case_firearms table with the new firearm_id and other attributes
    const insertCaseFirearmQuery = `
      INSERT INTO case_firearms (
        case_id, firearm_id, firearm_classification_id, caliber_id, used_in_shooting, modified, large_capacity_magazine, extended_magazine, firearm_purchase_timeframe_id, firearm_legal_id, firearm_illegal_id, assembled_with_legal_parts, gifted, firearm_theft_id, unknown
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
       RETURNING case_firearm_id
    `;
    const insertCaseFirearmValues = [
      case_id,
      firearm_id,
      firearm_classification_id,
      caliber_id,
      used_in_shooting,
      modified,
      large_capacity_magazine,
      extended_magazine,
      firearm_purchase_timeframe_id,
      firearm_legal_id,
      firearm_illegal_id,
      assembled_with_legal_parts,
      gifted,
      firearm_theft_id,
      unknown
    ];

    const queries = [{ query: insertCaseFirearmQuery, values: insertCaseFirearmValues }];

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