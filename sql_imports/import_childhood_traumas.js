import { convertToBoolean, parseValue } from '../handlers/utils.js';

const insertChildhoodTrauma = async (row, pool) => {
  const query = `
    INSERT INTO childhood_traumas (
      childhood_trauma, mother_violently_treated, parent_substance_abuse, parent_criminal_record, family_member_incarcerated, physical_abuse, sexual_abuse, emotional_abuse, neglect, childhood_socioeconomic_status_id, raised_by_single_parent, parental_separation_or_divorce, death_of_parent, suicide_of_parent, bullied, adult_trauma_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING childhood_trauma_id
  `;
  const values = [
    convertToBoolean(row['Childhood Trauma']),
    convertToBoolean(row['Mother Violent Treatment']),
    convertToBoolean(row['Parental Substance Abuse']),
    convertToBoolean(row['Parent Criminal Record']),
    convertToBoolean(row['Family Member Incarcerated']),
    convertToBoolean(row['Physically Abused']),
    convertToBoolean(row['Sexually Abused']),
    convertToBoolean(row['Emotionally Abused']),
    convertToBoolean(row['Neglected']),
    parseValue(row['Childhood SES'], parseInt),
    convertToBoolean(row['Raised by Single Parent']),
    convertToBoolean(row['Parental Divorce / Separation']),
    convertToBoolean(row['Parental Death in Childhood']),
    convertToBoolean(row['Parental Suicide']),
    convertToBoolean(row['Bullied']),
    parseValue(row['Adult Trauma'], parseInt),
  ];

  const result = await pool.query(query, values);
  return result.rows[0].childhood_trauma_id;
};

export default insertChildhoodTrauma;
