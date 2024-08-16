import { executeQuery } from '../../db.js';
import { createCustomError } from '../../../handlers/errors.js';
import { getSignsOfCrisis } from './crisis-queries.js';
import { getTraumas } from './trauma-queries.js';

const GET_SHOOTERS_QUERY = 'SELECT * FROM shooters';

const GET_SHOOTER_QUERY = `
  SELECT 
    s.shooter_id,
    s.first_name,
    s.last_name,
    s.signs_of_crisis_id,
    s.childhood_trauma_id,
    g.*,
    h.*,
    d.*,
    v.*
  FROM 
      shooters s
  LEFT JOIN 
      grievances_and_motivations g ON s.grievances_and_motivations_id = g.grievances_and_motivations_id
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

    if (shooterData.signs_of_crisis_id) {
      try {
        const signsOfCrisis = await getSignsOfCrisis(shooterData.signs_of_crisis_id);
        shooterData.signs_of_crisis = signsOfCrisis;
      } catch (err) {
        console.error('Error fetching signs of crisis:', err.message);
        shooterData.signs_of_crisis = null;
      }
    } else {
      shooterData.signs_of_crisis = null;
    }

    if (shooterData.childhood_trauma_id) {
      try {
        const traumas = await getTraumas(shooterData.signs_of_crisis_id);
        shooterData.childhood_trauma = traumas;
      } catch (err) {
        console.error('Error fetching childhood trauma:', err.message);
        shooterData.childhood_trauma = null;
      }
    } else {
      shooterData.childhood_trauma = null;
    }

    res.status(200).json(shooterData);
  } catch (err) {
    next(createCustomError(500, 'Internal Server Error', err.message));
  }
};