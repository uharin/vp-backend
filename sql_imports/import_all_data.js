import importCases from './import_cases.js';
import importVictims from './import_victims.js';
import importShooters from './import_shooters.js';
import importFirearms from './import_firearms.js';
import { pool } from '../db/db.js';

/* 
  Add in better logic later, for now set !initDB to true if initializing DB for first time
*/

const initDB = process.env.DB_INITIALIZED;

const importAllData = () => {
  if (!initDB) {
    importCases(pool);
    importVictims(pool);
    importShooters(pool);
    importFirearms(pool);
  } else { 
    console.log('All data has already been imported!');
  }
};

export default importAllData;
