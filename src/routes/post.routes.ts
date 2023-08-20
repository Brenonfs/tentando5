import { Router } from 'express';

import { PostControllers } from '../controllers/PostControllers';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
const postRoutes = Router();

const postControllers = new PostControllers();

postRoutes.use(ensureAuthenticated);
postRoutes.post('/', postControllers.create);
postRoutes.get('/:id', postControllers.list);
postRoutes.put('/:id', postControllers.update);
postRoutes.delete('/:id', postControllers.delete);

export { postRoutes };
