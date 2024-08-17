import { executeQuery } from '../../db.js';

const GET_HEALTHS_QUERY = `
  SELECT
    hm.hospitalization_for_psychiatric_reasons,
    hm.prior_counseling,
    hm.prescribed_psychiatric_medication,
    hm.treatment,
    hm.fasd,
    hm.autism_spectrum_disorder,
    hm.health_issues,
    hm.head_injury,
    hm.psychiatric_medication_specified,
    hm.specify_health_issues,
    hm.medication_category,
    f.history AS family_mental_health_history,
    mi.illness AS mental_illness,
    sa.substance AS substance_abuse,
    s.suicidal_ideation AS suicidality,
    v.type AS voluntary_involuntary
  FROM
    health_and_mental_health hm
    LEFT JOIN family_mental_health_issues f ON hm.family_mental_health_issues_id = f.family_mental_health_issues_id
    LEFT JOIN mental_illnesses mi ON hm.mental_illness_id = mi.mental_illness_id
    LEFT JOIN substance_abuse sa ON hm.substance_abuse_id = sa.substance_abuse_id
    LEFT JOIN suicidality s ON hm.suicidality_id = s.suicidality_id
    LEFT JOIN voluntary_involuntary v ON hm.voluntary_involuntary_hospitalization = v.voluntary_id
  WHERE
      hm.health_and_mental_health_id = $1;
`;

export const getHealths = async (id) => {
  try {
    const result = await executeQuery(GET_HEALTHS_QUERY, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    throw new Error(`Error fetching health history: ${err.message}`);
  }
};