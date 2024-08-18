import { executeQuery } from '../../db.js';

const GET_DEMOGRAPHICS_QUERY = `
  SELECT
    sd.age,
    sd.height,
    sd.weight,
    sd.heterosexual,
    sd.immigrant,
    sd.children,
    sd.number_of_siblings,
    sd.number_of_older_siblings,
    sd.number_of_younger_siblings,
    sd.community_involvement_specified,
    sd.employed,
    sd.school_performance_specified,
    bo.birth_order_description AS birth_order,
    ci.community_involvement_description AS community_involvement,
    e.education_level AS education,
    et.employment_type_description AS employment_type,
    g.gender AS gender,
    mb.military_branch_description AS military_branch,
    ms.military_service_description AS military_service,
    r.race AS race,
    rs.relationship_status_description AS relationship_status,
    rel.religion_name AS religion,
    sp.performance_category AS school_performance
  FROM
    shooter_demographics sd
    LEFT JOIN birth_orders bo ON sd.birth_order_id = bo.birth_order_id
    LEFT JOIN community_involvements ci ON sd.community_involvement_id = ci.community_involvement_id
    LEFT JOIN educations e ON sd.education_id = e.education_id
    LEFT JOIN employment_types et ON sd.employment_type_id = et.employment_type_id
    LEFT JOIN genders g ON sd.gender_id = g.gender_id
    LEFT JOIN military_branches mb ON sd.military_branch_id = mb.military_branch_id
    LEFT JOIN military_services ms ON sd.military_service_id = ms.military_service_id
    LEFT JOIN races r ON sd.race_id = r.race_id
    LEFT JOIN relationship_statuses rs ON sd.relationship_status_id = rs.relationship_status_id
    LEFT JOIN religions rel ON sd.religion_id = rel.religion_id
    LEFT JOIN school_performances sp ON sd.school_performance_id = sp.school_performance_id
  WHERE
    sd.shooter_demographics_id = $1;
`;

export const getDemographics = async (id) => {
  try {
    const result = await executeQuery(GET_DEMOGRAPHICS_QUERY, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    throw new Error(`Error fetching demographics: ${err.message}`);
  }
};