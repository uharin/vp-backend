import { convertToBoolean, parseValue } from '../handlers/utils.js';

const insertSignsOfCrisis = async (row, pool, shooter_id) => {
  const query = `
    INSERT INTO signs_of_crisis (
      shooter_id, triggering_event_id, signs_of_crisis, crisis_timeframe_id, specify_signs_of_crisis, inability_to_perform_daily_tasks, notably_depressed_mood, unusually_calm_or_happy, rapid_mood_swings, increased_agitation, abusive_behavior, isolation, losing_touch_with_reality, paranoia
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING signs_of_crisis_id
  `;
  const values = [
    shooter_id,
    parseValue(row['Recent or Ongoing Stressor'], parseInt),
    convertToBoolean(row['Signs of Being in Crisis']),
    parseValue(row['Timeline of Signs of Crisis'], parseInt),
    row['Signs of Crisis Expanded'] || null,
    convertToBoolean(row['Inability to Perform Daily Tasks']),
    convertToBoolean(row['Notably Depressed Mood']),
    convertToBoolean(row['Unusually Calm or Happy']),
    convertToBoolean(row['Rapid Mood Swings']),
    convertToBoolean(row['Increased Agitation']),
    convertToBoolean(row['Abusive Behavior']),
    convertToBoolean(row['Isolation']),
    convertToBoolean(row['Losing Touch with Reality']),
    convertToBoolean(row['Paranoia']),
  ];

  const result = await pool.query(query, values);
  return result.rows[0].signs_of_crisis_id;
};

export default insertSignsOfCrisis;
