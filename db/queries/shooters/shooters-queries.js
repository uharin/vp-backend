import { executeQuery, fetchRelatedData } from '../../db.js';
import { createCustomError } from '../../../handlers/errors.js';
import { getSignsOfCrisis } from './crisis-queries.js';
import { getTraumas } from './trauma-queries.js';
import { getMotivations } from './motivation-queries.js';
import { getHealths } from './health-queries.js';

const GET_SHOOTERS_QUERY = 'SELECT * FROM shooters';

const GET_SHOOTER_QUERY = `
  SELECT
    s.first_name,
    s.last_name,
    s.signs_of_crisis_id,
    s.childhood_trauma_id,
    s.grievances_and_motivations_id,
    h.*,
    d.*,
    v.*
  FROM 
      shooters s
  LEFT JOIN 
      health_and_mental_health h ON s.health_and_mental_health_id = h.health_and_mental_health_id
  LEFT JOIN 
      shooter_demographics d ON s.shooter_demographics_id = d.shooter_demographics_id
  LEFT JOIN 
      violence_and_crimes v ON s.violence_and_crimes_id = v.violence_and_crimes_id
  WHERE 
      s.shooter_id = $1;
`;

export const getShooters = async (_req, res, next) => {
  try {
    const result = await executeQuery(GET_SHOOTERS_QUERY);

    const responsePayload = {
      status: 'success',
      data: {
        cases: result.rows,
        count: result.rowCount,
      },
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
      signs_of_crisis_id: signsOfCrisisId,
      childhood_trauma_id: childhoodTraumaId,
      grievances_and_motivations_id: grievancesAndMotivationsId,
      health_and_mental_health_id: healthAndMentalHealthId,
    } = shooterData;

    const promises = [
      fetchRelatedData(signsOfCrisisId, getSignsOfCrisis, 'signs_of_crisis'),
      fetchRelatedData(childhoodTraumaId, getTraumas, 'childhood_trauma'),
      fetchRelatedData(grievancesAndMotivationsId, getMotivations, 'grievances_and_motivations'),
      fetchRelatedData(healthAndMentalHealthId, getHealths, 'health_and_mental_health'),
    ];

    const [crisisData, traumaData, motivationsData, healthData] = await Promise.all(promises);

    Object.assign(shooterData, crisisData, traumaData, motivationsData, healthData);

    res.status(200).json(shooterData);
  } catch (err) {
    next(createCustomError(500, 'Internal Server Error', err.message));
  }
};