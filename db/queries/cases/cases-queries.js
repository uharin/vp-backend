import { handleGetRequest } from '../../../handlers/requests.js';
import { FIREARMS_SUBQUERY } from '../firearms/firearms-queries.js';
import { VICTIMS_SUBQUERY } from '../victims/victims-queries.js';

export const generateCasesQuery = (params = '') => `
  WITH
    ${FIREARMS_SUBQUERY},
    ${VICTIMS_SUBQUERY}

    SELECT
      ARRAY_AGG(DISTINCT CONCAT(sh.first_name, ' ', sh.last_name)) AS shooters,
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
      ) AS firearms,
      json_agg(
        DISTINCT jsonb_build_object(
          'victim_name', vd.victim_name,
          'age', vd.age,
          'life_expectancy', vd.life_expectancy,
          'years_lost', vd.years_lost,
          'relationship_to_shooter_details', vd.relationship_to_shooter_details,
          'gender', vd.gender,
          'race', vd.race,
          'victim_knew_shooter_status', vd.victim_knew_shooter_status,
          'victim_relationship', vd.victim_relationship
        )
      ) AS victims,
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
    LEFT JOIN states s USING (state_id)
    LEFT JOIN regions r USING (region_id)
    LEFT JOIN civic_designations cd USING (civic_designation_id)
    LEFT JOIN locations l USING (location_id)
    LEFT JOIN access_types at USING (access_type_id)
    LEFT JOIN access_methods am USING (access_method_id)
    LEFT JOIN victim_locations vl USING (victim_location_id)
    LEFT JOIN armed_bystanders ab USING (armed_bystander_id)
    LEFT JOIN case_firearms cf USING (case_id)
    LEFT JOIN case_shooters cs USING (case_id)
    LEFT JOIN shooters sh USING (shooter_id)
    LEFT JOIN FirearmsData fd USING (case_id)
    LEFT JOIN VictimsData vd USING (case_id)
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