import { Router } from 'express';
import { getCases, getCase } from '../db/queries/cases/cases-queries.js';
import { getShooters, getShooter } from '../db/queries/shooters/shooters-queries.js';
import { getFirearms, getFirearm } from '../db/queries/firearms/firearms-queries.js';

const appRouter = Router();

appRouter.get('/', getCases);

/* Cases */
appRouter.get('/cases', getCases);
appRouter.get('/cases/:id', getCase);

/* Shooters */
appRouter.get('/shooters', getShooters);
appRouter.get('/shooters/:id', getShooter);

/* Firearms */
appRouter.get('/firearms', getFirearms);
appRouter.get('/firearms/:id', getFirearm);

export default appRouter;
