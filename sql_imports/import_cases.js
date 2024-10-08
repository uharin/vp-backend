import importData from './base_import.js';
import { convertToBoolean, parseValue } from '../handlers/utils.js';

/* Note, if const has + 1 added to end of assignment, it is due to discrepancy in original database, where IDs started at 0. We want them to start at 1 in our database. */

const processCaseRow = async (row) => {
  try {
    const case_id = parseValue(row['Case #'], parseInt, { offset: 0 });
    const full_date = new Date(row['Full Date']);
    const day_of_week = row['Day of Week'];
    const day = parseValue(row['Day'], parseInt, { offset: 0 });
    const month = parseValue(row['Month'], parseInt, { offset: 0 });
    const year = parseValue(row['Year'], parseInt, { offset: 0 });
    const street_number = row['Street Number'];
    const street_name = row['Street Name'];
    const city = row['City'];
    const county = row['County'];
    const zip_code = row['Zip Code'];
    const latitude = parseValue(row['Latitude'], parseFloat, { offset: 0 });
    const longitude = parseValue(row['Longitude'], parseFloat, { offset: 0 });
    const state_id = parseValue(row['State Code'], parseInt, { offset: 0 });
    const region_id = parseValue(row['Region'], parseInt);
    const civic_designation_id = parseValue(row['Urban/Suburban/Rural'], parseInt);
    const metropolitan = convertToBoolean(row['Metro/Micro Statistical Area Type']);
    const location_id = parseValue(row['Location'], parseInt);
    const location_specifics = row['Location Specified'];
    const insider = convertToBoolean(row['Insider or Outsider']);
    const access_type_id = parseValue(row['Access Required'], parseInt);

    let access_method_id = null;
    if (row['Accessed Space'].toUpperCase() !== 'NA') {
      access_method_id = parseValue(row['Accessed Space'], parseInt);
    }

    const victim_location_id = parseValue(row['Victims Inside / Outside'], parseInt);
    const workplace_shooting = convertToBoolean(row['Workplace Shooting']);
    const multiple_locations = convertToBoolean(row['Multiple Locations']);
    const other_location_specified = row['Other Location Specified'];
    const armed_person_on_scene = convertToBoolean(row['Armed Person on Scene']);
    const armed_bystander_id = parseValue(row['Specify Armed Person'], parseInt);
    const number_killed = parseValue(row['Number Killed'], parseInt, { offset: 0 });
    const number_injured = parseValue(row['Number Injured'], parseInt, { offset: 0 });
    const family_member_victim = convertToBoolean(row['Family Member Victim']);
    const romantic_partner_victim = convertToBoolean(row['Romantic Partner Victim']);
    const kidnapping_hostage_situation = convertToBoolean(row['Kidnapping or Hostage Situation']);

    const query = `
      INSERT INTO cases (
        case_id, full_date, day_of_week, day, month, year, street_number, street_name, city, county, zip_code, latitude, longitude, state_id, region_id, civic_designation_id, metropolitan, location_id, location_specifics, insider, access_type_id, access_method_id, victim_location_id, workplace_shooting, multiple_locations, other_location_specified, armed_person_on_scene, armed_bystander_id,
        number_killed, number_injured, family_member_victim,
        romantic_partner_victim, kidnapping_hostage_situation
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33)
    `;

    const values = [
      case_id,
      full_date,
      day_of_week,
      day,
      month,
      year,
      street_number,
      street_name,
      city,
      county,
      zip_code,
      latitude,
      longitude,
      state_id,
      region_id,
      civic_designation_id,
      metropolitan,
      location_id,
      location_specifics,
      insider,
      access_type_id,
      access_method_id,
      victim_location_id,
      workplace_shooting,
      multiple_locations,
      other_location_specified,
      armed_person_on_scene,
      armed_bystander_id,
      number_killed,
      number_injured,
      family_member_victim,
      romantic_partner_victim,
      kidnapping_hostage_situation,
    ];

    return [{ query, values }];
  } catch (error) {
    console.error('Error processing case row:', error);
    return null;
  }
};

const importCases = async (pool) => {
  await importData(pool, './sql_imports/csv/cases.csv', async (row) => {
    return await processCaseRow(row);
  });
};

export default importCases;
