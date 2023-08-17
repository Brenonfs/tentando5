import { Router } from "express";
const postRoutes = Router();
import {CreatePost, UpdatePost, DeletePost} from '../controllers/PostController';
import {ensureAuthenticated} from '../middlewares/ensureAuthenticated';

const createPost = new CreatePost();
const updatePost = new UpdatePost();
const deletePost = new DeletePost();

postRoutes.use(ensureAuthenticated);
postRoutes.post('/', createPost.handle);
postRoutes.put('/:id', updatePost.handle);
postRoutes.delete('/:id', deletePost.handle);

export{postRoutes}