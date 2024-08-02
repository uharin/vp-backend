import { pool } from '../db.js';
import { createCustomError } from '../../handlers/errors.js';

export const getShooters = async (_req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM shooters'
    );
    
    const responsePayload = {
      status: 'success',
      data: {
        cases: result.rows,
        count: result.rowCount,
      },
      message: 'Shooters retrieved successfully'
    };

    res.status(200).json(responsePayload);
  } catch (err) {
    next(createCustomError(500, 'Internal Server Error', err.message));
  }
};

export const getShooter = async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return next(createCustomError(400, 'Invalid case ID'));
  }

  try {
    const result = await pool.query(`
      SELECT 
        s.shooter_id,
        s.first_name,
        s.last_name,
        c.*,
        g.*,
        h.*,
        d.*,
        sc.*,
        v.*
      FROM 
          shooters s
      LEFT JOIN 
          childhood_traumas c ON s.childhood_trauma_id = c.childhood_trauma_id
      LEFT JOIN 
          grievances_and_motivations g ON s.grievances_and_motivations_id = g.grievances_and_motivations_id
      LEFT JOIN 
          health_and_mental_health h ON s.health_and_mental_health_id = h.health_and_mental_health_id
      LEFT JOIN 
          shooter_demographics d ON s.shooter_demographics_id = d.shooter_demographics_id
      LEFT JOIN 
          signs_of_crisis sc ON s.signs_of_crisis_id = sc.signs_of_crisis_id
      LEFT JOIN 
          violence_and_crimes v ON s.violence_and_crimes_id = v.violence_and_crimes_id
      WHERE 
          s.shooter_id = $1;
    `, [id]);
    if (result.rows.length === 0) {
      return next(createCustomError(404, 'Shooter not found'));
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(createCustomError(500, 'Internal Server Error', err.message));
  }
};