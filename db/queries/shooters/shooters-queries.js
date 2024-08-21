import { executeQuery, fetchRelatedData } from '../../db.js';
import { createCustomError } from '../../../handlers/errors.js';
import { toCamelCase } from '../../../handlers/utils.js';
import { getSignsOfCrisis } from './crisis-queries.js';
import { getTraumas } from './trauma-queries.js';
import { getMotivations } from './motivation-queries.js';
import { getHealths } from './health-queries.js';
import { getDemographics } from './demographics-queries.js';
import { getCrimeViolence } from './crime-violence-queries.js';

const GET_SHOOTERS_QUERY = 'SELECT * FROM shooters';

const GET_SHOOTER_QUERY = `
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
  WHERE 
      s.shooter_id = $1;
`;

export const getShooters = async (_req, res, next) => {
  try {
    const result = await executeQuery(GET_SHOOTERS_QUERY);

    const responsePayload = {
      status: 'success',
      data: { cases: result.rows },
      message: 'Shooters retrieved successfully',
    };

    res.status(200).json(responsePayload);
  } catch (err) {
    next(createCustomError(500, 'Internal Server Error', err.message));
  }
};

export const getShooter = async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return next(createCustomError(400, 'Invalid shooter ID'));
  }
  
  try {
    const result = await executeQuery(GET_SHOOTER_QUERY, [id]);

    const shooterData = result.rows[0];
      
    if (!shooterData) {
      return next(createCustomError(404, 'Shooter not found'));
    }

    const {
      first_name: firstName,
      last_name: lastName,
      signs_of_crisis_id: signsOfCrisisId,
      childhood_trauma_id: childhoodTraumaId,
      grievances_and_motivations_id: grievancesAndMotivationsId,
      health_and_mental_health_id: healthAndMentalHealthId,
      shooter_demographics_id: demographicsId,
      violence_and_crimes_id: crimeViolenceId,
    } = shooterData;

    const promises = [
      fetchRelatedData(signsOfCrisisId, getSignsOfCrisis, 'signs_of_crisis'),
      fetchRelatedData(childhoodTraumaId, getTraumas, 'childhood_trauma'),
      fetchRelatedData(grievancesAndMotivationsId, getMotivations, 'grievances_and_motivations'),
      fetchRelatedData(healthAndMentalHealthId, getHealths, 'health_and_mental_health'),
      fetchRelatedData(demographicsId, getDemographics, 'shooter_demographics'),
      fetchRelatedData(crimeViolenceId, getCrimeViolence, 'violence_and_crimes'),
    ];

    const [
      crisisData,
      traumaData,
      motivationsData,
      healthData,
      demographicsData,
      crimeViolenceData,
    ] = await Promise.all(promises);

    const response = {
      firstName,
      lastName,
      ...toCamelCase(crisisData),
      ...toCamelCase(traumaData),
      ...toCamelCase(motivationsData),
      ...toCamelCase(healthData),
      ...toCamelCase(demographicsData),
      ...toCamelCase(crimeViolenceData),
    };

    res.status(200).json(response);
  } catch (err) {
    next(createCustomError(500, 'Internal Server Error', err.message));
  }
};