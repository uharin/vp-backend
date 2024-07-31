import { pool } from './db.js';

export const getAllCases = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cases');
    
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
    console.error('Error fetching cases:', err);
    
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      error: err.message,
    });
  }
};

export const getCase = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM cases WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching case:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
