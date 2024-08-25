import { handleGetRequest } from "../../../handlers/requests.js";

export const generateShootersQuery = (params) => `
  SELECT
    s.first_name,
    s.last_name,
    s.signs_of_crisis_id,
    s.childhood_trauma_id,
    s.grievances_and_motivations_id,
    s.health_and_mental_health_id,
    s.shooter_demographics_id,
    s.violence_and_crimes_id
  FROM 
      shooters s
  ${params}
`;

export const getShooters = (req, res, next) => handleGetRequest('shooters', req, res, next);

export const getShooter = (req, res, next) => handleGetRequest('shooters', req, res, next);