import { pool } from '../db.js';
import { createCustomError } from '../../handlers/errors.js';

export const getCases = async (_req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT latitude, longitude, number_injured, number_killed FROM cases'
    );
    
    const responsePayload = {
      status: 'success',
      data: {
        cases: result.rows,
        count: result.rowCount,
      },
      message: 'Cases retrieved successfully'
    };

    res.status(200).json(responsePayload);
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
    const result = await pool.query('SELECT * FROM cases WHERE case_id = $1', [id]);
    if (result.rows.length === 0) {
      return next(createCustomError(404, 'Case not found'));
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(createCustomError(500, 'Internal Server Error', err.message));
  }
};
