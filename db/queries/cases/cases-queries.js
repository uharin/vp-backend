import { handleGetRequest } from '../../../handlers/requests.js';
import { FIREARMS_SUBQUERY } from '../firearms/firearms-queries.js';

export const generateCasesQuery = (params = '') => `
  ${FIREARMS_SUBQUERY}
  SELECT
    ARRAY_AGG(DISTINCT CONCAT(sh.first_name, ' ', sh.last_name)) AS shooters,
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
    ab.armed_bystander_type,
    json_agg(
    DISTINCT jsonb_build_object(
      'make_and_model', fd.make_and_model,
      'used_by', fd.used_by,
      'case_count', fd.case_count,
      'caliber', fd.caliber,
      'firearm_classification', fd.firearm_classification,
      'firearm_illegal_status', fd.firearm_illegal_status,
      'firearm_legal_status', fd.firearm_legal_status,
      'firearm_purchase_timeframe', fd.firearm_purchase_timeframe,
      'firearm_theft_status', fd.firearm_theft_status,
      'used_in_shooting', fd.used_in_shooting,
      'modified', fd.modified,
      'large_capacity_magazine', fd.large_capacity_magazine,
      'extended_magazine', fd.extended_magazine,
      'assembled_with_legal_parts', fd.assembled_with_legal_parts,
      'gifted', fd.gifted,
      'unknown', fd.unknown
    )
  ) AS firearms
  FROM cases c
  LEFT JOIN states s
    ON c.state_id = s.state_id
  LEFT JOIN regions r 
    ON c.region_id = r.region_id
  LEFT JOIN civic_designations cd 
    ON c.civic_designation_id = cd.civic_designation_id
  LEFT JOIN locations l 
    ON c.location_id = l.location_id
  LEFT JOIN access_types at 
    ON c.access_type_id = at.access_type_id
  LEFT JOIN access_methods am 
    ON c.access_method_id = am.access_method_id
  LEFT JOIN victim_locations vl 
    ON c.victim_location_id = vl.victim_location_id
  LEFT JOIN armed_bystanders ab 
    ON c.armed_bystander_id = ab.armed_bystander_id
  LEFT JOIN case_firearms cf
    ON c.case_id = cf.case_id
  LEFT JOIN case_shooters cs 
    ON c.case_id = cs.case_id
  LEFT JOIN shooters sh 
    ON cs.shooter_id = sh.shooter_id
  LEFT JOIN FirearmsData fd
    ON c.case_id = fd.case_id
  ${params}
  GROUP BY
    c.case_id,
    c.full_date,
    c.day_of_week,
    c.day,
    c.month,
    c.year,
    c.street_number,
    c.street_name,
    c.city,
    c.county,
    c.zip_code,
    c.latitude,
    c.longitude,
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
    ab.armed_bystander_type;
`;

export const getCases = (req, res, next) => handleGetRequest('cases', req, res, next);

export const getCase = (req, res, next) => handleGetRequest('cases', req, res, next);