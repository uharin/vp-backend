/* eslint-disable no-undef */
import pg from 'pg';
import { config } from 'dotenv';
const { Pool } = pg;

// Initialize use of .env variables
config();

// PostgreSQL pool configuration
const pool = new Pool({
  host: process.env.HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
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

/* Base SQL query wrapper */
const executeQuery = async (query, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result;
  } catch (err) {
    throw new Error(`Error executing query: ${err.message}`);
  } finally {
    client.release();
  }
};

/* Used for fetching and processing data from related tables (usually lookup tables) */
const fetchRelatedData = async (id, fetchFn, key) => {
  if (id) {
    try {
      const data = await fetchFn(id);
      return { [key]: data };
    } catch (err) {
      console.error(`Error fetching ${key}:`, err.message);
      return { [key]: null };
    }
  }
  return { [key]: null };
};

export { connectToDatabase, executeQuery, fetchRelatedData, pool };
