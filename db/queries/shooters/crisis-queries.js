import { executeQuery } from '../../db.js';

const GET_SIGNS_OF_CRISIS_QUERY = `
  SELECT
    sc.unusually_calm_or_happy,
    sc.specify_signs_of_crisis,
    sc.signs_of_crisis,
    sc.rapid_mood_swings,
    sc.paranoia,
    sc.notably_depressed_mood,
    sc.losing_touch_with_reality,
    sc.isolation,
    sc.increased_agitation,
    sc.inability_to_perform_daily_tasks,
    sc.abusive_behavior,
    te.event AS triggering_event,
    ct.timeframe AS crisis_timeframe
  FROM
      signs_of_crisis sc
      LEFT JOIN triggering_events te USING (triggering_event_id)
      LEFT JOIN crisis_timeframes ct USING (crisis_timeframe_id)
  WHERE
      sc.signs_of_crisis_id = $1;
`;

export const getSignsOfCrisis = async (id) => {
  try {
    const result = await executeQuery(GET_SIGNS_OF_CRISIS_QUERY, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    throw new Error(`Error fetching signs of crisis: ${err.message}`);
  }
};