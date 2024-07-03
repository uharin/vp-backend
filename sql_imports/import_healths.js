import { convertToBoolean, parseValue } from '../handlers/utils.js';

const insertHealthAndMentalHealth = async (row, pool) => {
  const query = `
    INSERT INTO health_and_mental_health (
      mental_illness_id, fasd, family_mental_health_issues_id, autism_spectrum_disorder, substance_abuse_id, health_issues, specify_health_issues, head_injury, prescribed_psychiatric_medication, psychiatric_medication_specified, medication_category, treatment,
      voluntary_involuntary_hospitalization, suicidality_id, prior_counseling, voluntary_mandatory_counseling

    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING health_and_mental_health_id
  `;
  const values = [
    parseValue(row['Mental Illness'], parseInt),
    convertToBoolean(row['FASD (Fetal Alcohol Spectrum Disorder)']),
    parseValue(row['Known Family Mental Health History'], parseInt),
    convertToBoolean(row['Autism Spectrum']),
    parseValue(row['Substance Use'], parseInt),
    convertToBoolean(row['Health Issues']),
    row['Health Issues - Specify'] || null,
    convertToBoolean(row['Head Injury / Possible TBI']),
    convertToBoolean(row['Psychiatric Medication']),
    row['Psychiatric Medication Specified'] || null,
    row['Medication Category'] || null,
    convertToBoolean(row['Treatment 6 Months Prior to Shooting']),
    parseValue(row['Voluntary or Involuntary Hospitalization'], parseInt),
    parseValue(row['Suicidality'], parseInt),
    convertToBoolean(row['Prior Counseling']),
    parseValue(row['Voluntary or Mandatory Counseling'], parseInt),
  ];

  const result = await pool.query(query, values);
  return result.rows[0].health_and_mental_health_id;
};

export default insertHealthAndMentalHealth;
