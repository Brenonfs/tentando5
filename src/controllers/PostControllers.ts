import { Request, Response } from 'express';

import { UnauthorizedError } from '../helpers/api-erros';
import { CreatePostService } from '../services/PostService/createPost.service';
import { DeletePostService } from '../services/PostService/deletePost.service';
import { ListPostService } from '../services/PostService/listPost.service';
import { SearchPostService } from '../services/PostService/searchPost.service';
import { UpdatePostService } from '../services/PostService/updatePost.service';

export class PostControllers {
  async create(req: Request, res: Response) {
    const { title, content } = req.body;
    const userId = req.user?.id;
    if (userId === undefined) {
      throw new UnauthorizedError('Usuário não autenticado.');
    }
    try {
      const createPostService = new CreatePostService();
      const result = await createPostService.execute(title, content, userId);

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
  async search(req: Request, res: Response) {
    try {
      const searchPostService = new SearchPostService();
      const result = await searchPostService.execute(req);

      return res.json({
        error: false,
        message: 'Sucess',
        result,
      });
    } catch (error) {
      throw new UnauthorizedError(`Não foi possível fazer a busca: ${error}`);
    }
  }
}
