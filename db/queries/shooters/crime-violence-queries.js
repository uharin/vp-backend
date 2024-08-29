import { executeQuery } from '../../db.js';

const GET_CRIME_VIOLENCE_QUERY = `
    SELECT
    vc.animal_abuse,
    vc.bully,
    vc.criminal_record,
    vc.gang_association,
    vc.known_to_police_or_fbi,
    vc.sexual_offenses,
    vc.terror_group_association,
    cji.involvement AS criminal_justice_involvement,
    c1.crime_type AS crime_type_1,
    c2.crime_type AS crime_type_2,
    hga.hate_group_type AS hate_group_association,
    pa.altercation AS physical_altercation,
    vvg.video_game_type AS violent_video_game_played,
    COALESCE(array_agg(DISTINCT da.abuse_type) FILTER (WHERE da.abuse_type IS NOT NULL), ARRAY['No abuse recorded']) AS domestic_abuses,
    COALESCE(array_agg(DISTINCT dah.abuse_history) FILTER (WHERE dah.abuse_history IS NOT NULL), ARRAY['No history recorded']) AS domestic_abuse_histories
  FROM
    violence_and_crimes vc
    LEFT JOIN criminal_justice_involvements cji USING (criminal_justice_involvement_id)
    LEFT JOIN crimes1 c1 USING (crimes1_id)
    LEFT JOIN crimes2 c2 USING (crimes2_id)
    LEFT JOIN hate_group_associations hga USING (hate_group_association_id)
    LEFT JOIN physical_altercations pa USING (physical_altercation_id)
    LEFT JOIN played_violent_video_games vvg USING (violent_video_game_id)
    LEFT JOIN (
      SELECT sda.violence_and_crimes_id, da.abuse_type
      FROM shooter_domestic_abuses sda
      JOIN domestic_abuses da USING (domestic_abuse_id)
    ) da USING (violence_and_crimes_id)
    LEFT JOIN (
      SELECT sdah.violence_and_crimes_id, dah.abuse_history
      FROM shooter_domestic_abuse_histories sdah
      JOIN domestic_abuse_histories dah USING (domestic_abuse_history_id)
    ) dah USING (violence_and_crimes_id)
  WHERE
    vc.violence_and_crimes_id = $1
  GROUP BY
    vc.violence_and_crimes_id, cji.involvement, c1.crime_type, c2.crime_type,
    hga.hate_group_type, pa.altercation, vvg.video_game_type;
`;
    
export const getCrimeViolence = async (id) => {
  try {
  const result = await executeQuery(GET_CRIME_VIOLENCE_QUERY, [id]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
  } catch (err) {
    throw new Error(`Error fetching crimes and violence: ${err.message}`, { cause: err });
  }
};