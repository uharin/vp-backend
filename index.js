import express from 'express';
import appRouter from './routes/router.js';
import { connectToDatabase, pool } from './db/db.js';
import importCases from './sql_imports/import_cases.js';
import importVictims from './sql_imports/import_victims.js';
import importShooters from './sql_imports/import_shooters.js';
import importFirearms from './sql_imports/import_firearms.js';

const app = express();

// Middleware
app.use(express.json());

app.use('/api/v1/cases', appRouter);

const PORT = process.env.API_PORT || 3001;

// Connect to PostGres database
connectToDatabase()
  .then(() => {
    // Start the API server
    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);

      // Handle server errors
      server.on('error', (err) => {
        console.error('Error starting the server:', err);
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  });

importCases(pool);
importVictims(pool);
importShooters(pool);
importFirearms(pool);
