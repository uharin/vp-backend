import { convertToBoolean, parseValue } from '../handlers/utils.js';

const insertGrievancesAndMotivations = async (row, pool, shooter_id) => {
  const query = `
    INSERT INTO grievances_and_motivations (
      shooter_id, known_prejudices_id, racism_id, religious_hate_id, misogyny, homophobia, employment_issue, economic_issue, legal_issue, relationship_issue, interpersonal_conflict, fame_seeking, motive_other_id, motive_unknown, role_of_psychosis_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING grievances_and_motivations_id
  `;
  const values = [
    shooter_id,
    parseValue(row['Known Prejudices'], parseInt),
    parseValue(row['Motive: Racism/Xenophobia'], parseInt),
    parseValue(row['Motive: Religious Hate'], parseInt),
    convertToBoolean(row['Motive: Misogyny']),
    convertToBoolean(row['Motive: Homophobia']),
    convertToBoolean(row['Motive: Employment Issue']),
    convertToBoolean(row['Motive: Economic Issue']),
    convertToBoolean(row['Motive: Legal Issue']),
    convertToBoolean(row['Motive: Relationship Issue']),
    convertToBoolean(row['Motive: Interpersonal Conflict']),
    convertToBoolean(row['Motive: Fame-Seeking']),
    parseValue(row['Motive: Other'], parseInt),
    convertToBoolean(row['Motive: Unknown']),
    parseValue(row['Role of Psychosis in the Shooting'], parseInt),
  ];

  const result = await pool.query(query, values);
  return result.rows[0].grievances_and_motivations_id;
};

export default insertGrievancesAndMotivations;
