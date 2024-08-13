import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectToDatabase } from './db/db.js';
import { errorHandler } from './handlers/errors.js'
import appRouter from './routes/router.js';
import importAllData from './sql_imports/import_all_data.js'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerDocument = YAML.load("./swagger.yaml");

// CORS configuration
const corsOptions = {
  origin: 'http://frontend:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  allowedHeaders: 'Content-Type, Authorization', 
};

const PORT = process.env.API_PORT || 3001;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use('/api/v1', appRouter); // API routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Swagger API doc route
app.use(errorHandler);

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

importAllData();