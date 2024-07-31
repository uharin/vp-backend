import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import appRouter from './routes/router.js';
import { connectToDatabase, pool } from './db/db.js';
import importCases from './sql_imports/import_cases.js';
import importVictims from './sql_imports/import_victims.js';
import importShooters from './sql_imports/import_shooters.js';
import importFirearms from './sql_imports/import_firearms.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CORS configuration
const corsOptions = {
  origin: 'http://frontend:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  allowedHeaders: 'Content-Type, Authorization', 
};

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use('/api/v1', appRouter);

const PORT = process.env.API_PORT || 3001;
const initDB = process.env.DB_INITIALIZED;

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

  /* 
    Add in better logic later, for now set !initDB to true if initializing DB for first time
  */
  if (!initDB) {
    importCases(pool);
    importVictims(pool);
    importShooters(pool);
    importFirearms(pool);
  }
