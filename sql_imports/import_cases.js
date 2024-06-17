import fs from 'fs';
import csv from 'csv-parser';
import { convertToBoolean } from '../handlers/utils.js';

const importCases = async (pool) => {
  try {
    const insertPromises = [];

    fs.createReadStream('./sql_imports/cases.csv')
      .pipe(csv())
      .on('data', async (row) => {
        try {
          const case_id = parseInt(row['Case #']);
          const full_date = new Date(row['Full Date']);
          const day_of_week = row['Day of Week'];
          const day = parseInt(row['Day']);
          const month = parseInt(row['Month']);
          const year = parseInt(row['Year']);
          const street_number = row['Street Number'];
          const street_name = row['Street Name'];
          const city = row['City'];
          const county = row['County'];
          const zip_code = row['Zip Code'];
          const latitude = parseFloat(row['Latitude']);
          const longitude = parseFloat(row['Longitude']);
          const state_id = parseInt(row['State Code']);
          const region_id = parseInt(row['Region']);
          const civic_designation_id = parseInt(row['Urban/Suburban/Rural']);
          const metropolitan = convertToBoolean(row['Metro/Micro Statistical Area Type']);
          const location_id = row['Location'];
          const location_specifics = row['Location Specified'];
          const insider = convertToBoolean(row['Insider or Outsider']);
          const access_type_id = parseInt(row['Access Required']);

          // Handle Accessed Space column
          let access_method_id = null;
          if (row['Accessed Space'].toUpperCase() !== 'NA') {
            access_method_id = parseInt(row['Accessed Space']);
          }
          
          const victim_location_id = parseInt(row['Victims Inside / Outside']);
          const workplace_shooting = convertToBoolean(row['Workplace Shooting']);
          const multiple_locations = convertToBoolean(row['Multiple Locations']);
          const other_location_specified = row['Other Location Specified'];
          const armed_person_on_scene = convertToBoolean(row['Armed Person on Scene']);
          const armed_bystander_id = parseInt(row['Specify Armed Person']);
          const number_killed = parseInt(row['Number Killed']);
          const number_injured = parseInt(row['Number Injured']);
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
            case_id, full_date, day_of_week, day, month, year,
            street_number, street_name, city, county, zip_code,
            latitude, longitude, state_id, region_id,  civic_designation_id, metropolitan, location_id,
            location_specifics, insider, access_type_id, access_method_id, victim_location_id, workplace_shooting, multiple_locations, other_location_specified, armed_person_on_scene, armed_bystander_id,
            number_killed, number_injured, family_member_victim,
            romantic_partner_victim, kidnapping_hostage_situation
          ];

          insertPromises.push(pool.query(query, values));
        } catch (error) {
          console.error('Error inserting row:', error);
        }
      })
      .on('end', async () => {
        try {
          await Promise.all(insertPromises);
          console.log('CSV file successfully processed');
        } catch (error) {
          console.error('Error inserting rows:', error);
        } finally {
          await pool.end(); // Close the database connection pool after all operations are done
        }
      });
  } catch (error) {
    console.error('Error importing CSV:', error);
  }
};

export default importCases;
