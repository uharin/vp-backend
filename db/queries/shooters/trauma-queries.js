import { executeQuery } from '../../db.js';

const GET_TRAUMAS_QUERY = `
  SELECT
    ct.bullied,
    ct.raised_by_single_parent,
    ct.parental_separation_or_divorce,
    ct.suicide_of_parent,
    ct.death_of_parent,
    ct.childhood_trauma,
    ct.physical_abuse,
    ct.sexual_abuse,
    ct.emotional_abuse,
    ct.neglect,
    ct.mother_violently_treated,
    ct.parent_substance_abuse,
    ct.parent_criminal_record,
    ct.family_member_incarcerated,
    at.trauma AS adult_trauma,
    ss.socioeconomic_status AS childhood_socioeconomic_status
  FROM
      childhood_traumas ct
      LEFT JOIN socioeconomic_status ss USING (socioeconomic_status_id)
      LEFT JOIN adult_traumas at USING (adult_trauma_id)
  WHERE
      ct.childhood_trauma_id = $1;
`;

export const getTraumas = async (id) => {
  try {
    const result = await executeQuery(GET_TRAUMAS_QUERY, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    throw new Error(`Error fetching signs of crisis: ${err.message}`);
  }
};
