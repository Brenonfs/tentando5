import { Router } from 'express';

import { CreateUser, UpdateUser } from '../controllers/UserController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
const userRoutes = Router();

const createUser = new CreateUser();
const updateUser = new UpdateUser();

userRoutes.post('/', createUser.handle);
userRoutes.put('/', ensureAuthenticated, updateUser.handle);

export { userRoutes };
