import { Request, Response } from 'express';

import { UnauthorizedError } from '../helpers/api-erros';
import { CreatePostService } from '../services/PostService/create.post.service';
import { DeletePostService } from '../services/PostService/delete.post.service';
import { ListPostService } from '../services/PostService/list.post.service';
import { UpdatePostService } from '../services/PostService/update.post.service';

export class PostControllers {
  async create(req: Request, res: Response) {
    try {
      const createPostService = new CreatePostService();
      const result = await createPostService.execute(req);

      return res.json({
        error: false,
        message: 'Sucess: post created',
        result,
      });
    } catch (error) {
      throw new UnauthorizedError(`Não foi possível criar o post: ${error}`);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const updatePostService = new UpdatePostService();
      const result = await updatePostService.execute(req);

      return res.json({
        error: false,
        message: 'Sucess: post updated',
        result,
      });
    } catch (error) {
      throw new UnauthorizedError(`Não foi possível atualizar o post: ${error}`);
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const deletePostService = new DeletePostService();
      const result = await deletePostService.execute(req);

      return res.json({
        error: false,
        message: 'Sucess: post deleted',
        result,
      });
    } catch (error) {
      throw new UnauthorizedError(`Não foi possível deletar o post: ${error}`);
    }
  }
  async list(req: Request, res: Response) {
    try {
      const listPostService = new ListPostService();
      const result = await listPostService.execute(req);

      return res.json({
        error: false,
        message: 'Sucess: post listed',
        result,
      });
    } catch (error) {
      throw new UnauthorizedError(`Não foi possível listar o post: ${error}`);
    }
  }
}
