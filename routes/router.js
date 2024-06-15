import { Router } from 'express';
import { getAllCases, getCase, createReport, updateReport, deleteReport } from '../handlers/handlers.js';

const appRouter = Router();

appRouter.get('/', getAllCases);

appRouter.get('/:id', getCase);

appRouter.post('/create', createReport);

appRouter.put('/update/:id', updateReport);

appRouter.delete('/delete/:id', deleteReport);

export default appRouter;
