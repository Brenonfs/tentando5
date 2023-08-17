import { Router } from "express";
const sessionRoutes = Router();
import {CreateSession} from '../controllers/SessionController';

const createSession = new CreateSession();


sessionRoutes.post('/', createSession.handle);

export{sessionRoutes}