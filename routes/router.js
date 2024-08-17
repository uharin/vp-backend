import { Router } from 'express';
import { getCases, getCase } from '../db/queries/cases-queries.js';
import { getShooters, getShooter } from '../db/queries/shooters/shooters-queries.js';

const appRouter = Router();

appRouter.get('/', getCases);

/* Cases */
appRouter.get('/cases', getCases);
appRouter.get('/cases/:id', getCase);

/* Shooters */
appRouter.get('/shooters', getShooters);
appRouter.get('/shooters/:id', getShooter);

export default appRouter;
