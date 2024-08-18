import { executeQuery } from '../../db.js';
import { toCamelCase } from '../../../handlers/utils.js';
import { createCustomError } from '../../../handlers/errors.js';

const GET_CASES_QUERY = `
  SELECT
    TO_CHAR(c.full_date, 'FMMonth DD, YYYY') AS date,
    c.day_of_week,
    c.day,
    c.month,
    c.year,
    CONCAT(c.street_number, ' ', c.street_name) AS full_address,
    c.city,
    c.county,
    c.zip_code,
    json_build_object('lat', c.latitude, 'lng', c.longitude) AS coordinates,
    c.metropolitan,
    c.location_specifics,
    c.insider,
    c.workplace_shooting,
    c.multiple_locations,
    c.other_location_specified,
    c.armed_person_on_scene,
    c.number_killed,
    c.number_injured,
    c.family_member_victim,
    c.romantic_partner_victim,
    c.kidnapping_hostage_situation,
    s.state,
    r.region,
    cd.civic_designation_type,
    l.location_type,
    at.access_type,
    am.access_method,
    vl.victim_location,
    ab.armed_bystander_type
  FROM cases c
  LEFT JOIN 
    states s ON c.state_id = s.state_id
  LEFT JOIN 
    regions r ON c.region_id = r.region_id
  LEFT JOIN 
    civic_designations cd ON c.civic_designation_id = cd.civic_designation_id
  LEFT JOIN 
    locations l ON c.location_id = l.location_id
  LEFT JOIN 
    access_types at ON c.access_type_id = at.access_type_id
  LEFT JOIN 
    access_methods am ON c.access_method_id = am.access_method_id
  LEFT JOIN 
    victim_locations vl ON c.victim_location_id = vl.victim_location_id
  LEFT JOIN 
    armed_bystanders ab ON c.armed_bystander_id = ab.armed_bystander_id
`;

// Helper function to reduce redundant query code.
const getCaseQuery = (singleCase = false) => {
  if (singleCase) {
    return GET_CASES_QUERY + ' WHERE c.case_id = $1';
  }
  return GET_CASES_QUERY + ';';
};

export const getCases = async (_req, res, next) => {
  try {
    const result = await executeQuery(getCaseQuery());
    
    const responsePayload = {
      status: 'success',
      data: {
        cases: result.rows,
        count: result.rowCount,
      },
      message: 'Cases retrieved successfully'
    };

    res.status(200).json(toCamelCase(responsePayload));
  } catch (err) {
    next(createCustomError(500, 'Internal Server Error', err.message));
  }
};

export const getCase = async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return next(createCustomError(400, 'Invalid case ID'));
  }

  try {
    const result =  await executeQuery(getCaseQuery(true), [id]);

    const caseData = result.rows[0];

    if (!caseData) {
      return next(createCustomError(404, 'Case not found'));
    }

    res.status(200).json(toCamelCase(caseData));
  } catch (err) {
    next(createCustomError(500, 'Internal Server Error', err.message));
  }
};
