import { Router } from 'express';

import { CreateSession } from '../controllers/SessionController';
const sessionRoutes = Router();

const createSession = new CreateSession();

sessionRoutes.post('/', createSession.handle);

export { sessionRoutes };
