import { handleGetRequest } from '../../../handlers/requests.js';

const generateVictimsBaseQuery  = (withCaseId = false, params = '') => `
  SELECT 
    ${withCaseId ? 'cv.case_id,' : ''}
    v.victim_name,
    v.age,
    v.life_expectancy,
    v.years_lost,
    v.relationship_to_shooter_details,
    g.gender,
    r.race,
    vks.victim_knew_shooter_status,
    vr.victim_relationship
  FROM ${withCaseId
    ? 'case_victims cv LEFT JOIN victims v USING (victim_id)' 
    : 'victims v'
  }
  LEFT JOIN genders g USING (gender_id)
  LEFT JOIN races r USING (race_id)
  LEFT JOIN victim_knew_shooter_statuses vks USING (victim_knew_shooter_status_id)
  LEFT JOIN victim_relationships vr USING (victim_relationship_id)
  ${params}
`;

export const generateVictimsQuery = (params = '') => generateVictimsBaseQuery(false, params);

// Used in case query, thus requires case_id from case_victims table
export const VICTIMS_SUBQUERY = `
  VictimsData AS (
    ${generateVictimsBaseQuery(true)}
  )
`;

export const getVictims = (req, res, next) => handleGetRequest('victims', req, res, next);

export const getVictim = (req, res, next) => handleGetRequest('victims', req, res, next);