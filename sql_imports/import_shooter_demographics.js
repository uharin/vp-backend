import { convertToBoolean, parseValue } from '../handlers/utils.js';

/* 
  Note: { offset: 0 } is due to discrepancy in original database, where IDs started at 0. 
  By default, we offset them by 1 in parseValue function. So if a value does *not* need to be offset, we must declare that here.
*/

const insertShooterDemographics = async (row, pool) => {
  const query = `
    INSERT INTO shooter_demographics (
      age, gender_id, race_id, height, weight, immigrant, heterosexual, religion_id, education_id, school_performance_id, school_performance_specified, birth_order_id, number_of_siblings, number_of_older_siblings, number_of_younger_siblings, relationship_status_id, children, employed, employment_type_id, military_service_id, military_branch_id, community_involvement_id, community_involvement_specified
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING shooter_demographics_id
  `;
  const values = [
    parseValue(row['Age'], parseInt, { offset: 0 }),
    parseValue(row['Gender'], parseInt, { offset: row['Gender'] === '3' ? -1 : 1 }), // Conditional offset is because there is no '2' value in the data, only 0, 1, and 3
    parseValue(row['Race'], parseInt),
    parseValue(row['Height'], parseInt, { offset: 0 }),
    parseValue(row['Weight'], parseInt, { offset: 0 }),
    convertToBoolean(row['Immigrant']),
    convertToBoolean(row['Heterosexual']),
    parseValue(row['Religion'], parseInt),
    parseValue(row['Education'], parseInt),
    parseValue(row['School Performance'], parseInt),
    row['School Performance Specified'] || null,
    parseValue(row['Birth Order'], parseInt),
    parseValue(row['Number of Siblings'], parseInt, { offset: 0 }),
    parseValue(row['Older Siblings'], parseInt, { offset: 0 }),
    parseValue(row['Younger Siblings'], parseInt, { offset: 0 }),
    parseValue(row['Relationship Status'], parseInt),
    convertToBoolean(row['Children']),
    convertToBoolean(row['Employed']),
    parseValue(row['Employment Type'], parseInt),
    parseValue(row['Military Service'], parseInt),
    parseValue(row['Military Branch'], parseInt),
    parseValue(row['Community Involvement'], parseInt),
    row['Community Involvement Specified'] || null,
  ];

  const result = await pool.query(query, values);
  return result.rows[0].shooter_demographics_id;
};

export default insertShooterDemographics;
