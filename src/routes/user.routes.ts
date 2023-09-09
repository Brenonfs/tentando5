import { Router } from 'express';

import { UserControllers } from '../controllers/UserControllers'; // alterado
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
const userRoutes = Router();

const userControllers = new UserControllers();

userRoutes.post('/', userControllers.create);
// userRoutes.put('/', ensureAuthenticated, userControllers.update);

export { userRoutes };
