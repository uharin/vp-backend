import { executeQuery } from '../../db.js';

const GET_MOTIVATIONS_QUERY = `
  SELECT
    gm.misogyny,
    gm.homophobia,
    gm.employment_issue,
    gm.economic_issue,
    gm.legal_issue,
    gm.relationship_issue,
    gm.interpersonal_conflict,
    gm.fame_seeking,
    gm.motive_unknown,
    kp.prejudice AS known_prejudice,
    mo.motive AS motive_other,
    r.racism_type AS racism_type,
    rh.religions_hate_type AS religious_hate_type,
    rp.description AS role_of_psychosis
  FROM
    grievances_and_motivations gm
    LEFT JOIN known_prejudices kp
      ON gm.known_prejudices_id = kp.known_prejudices_id
    LEFT JOIN motive_other mo
      ON gm.motive_other_id = mo.motive_other_id
    LEFT JOIN racism r
      ON gm.racism_id = r.racism_id
    LEFT JOIN religious_hate rh
      ON gm.religious_hate_id = rh.religious_hate_id
    LEFT JOIN role_of_psychosis rp
      ON gm.role_of_psychosis_id = rp.role_of_psychosis_id
  WHERE
    gm.grievances_and_motivations_id = $1;
`;

export const getMotivations = async (id) => {
  try {
    const result = await executeQuery(GET_MOTIVATIONS_QUERY, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    throw new Error(`Error fetching motivations: ${err.message}`);
  }
};