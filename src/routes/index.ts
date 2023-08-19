import { Router } from 'express';

import { postRoutes } from './post.routes';
import { sessionRoutes } from './session.routes';
import { userRoutes } from './user.routes';

const router = Router();
router.use('/users', userRoutes);
router.use('/session', sessionRoutes);
router.use('/post', postRoutes);

export { router };
