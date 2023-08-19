import { Router } from 'express';

import { CreatePost, UpdatePost, DeletePost } from '../controllers/PostController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
const postRoutes = Router();

const createPost = new CreatePost();
const updatePost = new UpdatePost();
const deletePost = new DeletePost();

postRoutes.use(ensureAuthenticated);
postRoutes.post('/', createPost.handle);
postRoutes.put('/:id', updatePost.handle);
postRoutes.delete('/:id', deletePost.handle);

export { postRoutes };
