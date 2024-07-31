import { Router } from 'express';
import { getAllCases, getCase } from '../db/queries.js';

const appRouter = Router();

appRouter.get('/', getAllCases);

appRouter.get('/cases', getAllCases);

appRouter.get('/cases/:id', getCase);

export default appRouter;
