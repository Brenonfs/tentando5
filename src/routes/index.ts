import { Router } from 'express';

import { apiAxios } from '../apiAxios';
import { postRoutes } from './post.routes';
import { sessionRoutes } from './session.routes';
import { userRoutes } from './user.routes';

const router = Router();
router.use('/users', userRoutes);
router.use('/session', sessionRoutes);
router.use('/post', postRoutes);
router.use('/api', apiAxios);
export { router };
