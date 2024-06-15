/* eslint-disable no-undef */
import pkg from 'pg';
import { config } from 'dotenv';
const { Pool } = pkg;

// Initialize use of .env variables
config();

// PostgreSQL pool configuration
const pool = new Pool({
  host: process.env.HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

const connectToDatabase = async () => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT NOW()');
    console.log('Server time:', res.rows[0]);
  } catch (err) {
    console.error('Query error', err.stack);
    throw err;
  } finally {
    client.release();
  }
};

export { connectToDatabase, pool };
