import { Request, Response } from 'express';

import { UnauthorizedError } from '../helpers/api-erros';
import { postCreateSchema, postIdSchema, postSearchSchema, postUpdatedSchema } from '../schemas/post';
import { CreatePostService } from '../services/PostService/createPost.service';
import { DeletePostService } from '../services/PostService/deletePost.service';
import { ListPostService } from '../services/PostService/listPost.service';
import { SearchPostService } from '../services/PostService/searchPost.service';
import { UpdatePostService } from '../services/PostService/updatePost.service';

export class PostControllers {
  private createPostService: CreatePostService;
  private deletePostService: DeletePostService;
  private listPostService: ListPostService;
  private searchPostService: SearchPostService;
  private updatePostService: UpdatePostService;

  constructor() {
    this.createPostService = new CreatePostService();
    this.deletePostService = new DeletePostService();
    this.listPostService = new ListPostService();
    this.searchPostService = new SearchPostService();
    this.updatePostService = new UpdatePostService();
  }

  async create(req: Request, res: Response) {
    const validatedPostSchema = postCreateSchema.parse(req.body);
    const userId = req.user?.id;
    if (userId === undefined) {
      throw new UnauthorizedError('Usuário não autenticado.');
    }
    try {
      const result = await this.createPostService.execute(
        validatedPostSchema.title,
        validatedPostSchema.content,
        userId,
      );

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
      const validatedIdSchema = postIdSchema.parse(req.params.id);
      const validatedPostSchema = postUpdatedSchema.parse(req.body);
      const userId = req.user?.id;

      if (userId === undefined) {
        throw new UnauthorizedError('UserId is not authenticated.');
      }

      const result = await this.updatePostService.execute(
        validatedIdSchema,
        validatedPostSchema.title,
        validatedPostSchema.content,
        userId,
      );

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
      const validatedIdSchema = postIdSchema.parse(req.params.id);
      const userId = req.user?.id;
      if (userId === undefined) {
        throw new UnauthorizedError('UserId is not authenticated.');
      }

      const result = await this.deletePostService.execute(validatedIdSchema, userId as number); // Use uma type assertion aqui

      return res.json({
        error: false,
        message: 'Sucesso: post deletado',
        result,
      });
    } catch (error) {
      throw new UnauthorizedError(`Não foi possível deletar o post: ${error}`);
    }
  }

  async list(req: Request, res: Response) {
    try {
      const validatedIdSchema = postIdSchema.parse(req.params.id);
      const userId = req.user?.id;
      if (userId === undefined) {
        throw new UnauthorizedError('UserId is not authenticated.');
      }
      const result = await this.listPostService.execute(validatedIdSchema, userId as number);

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
      const validatedPostSchema = postSearchSchema.parse(req.query.searchas as string);
      const userId = req.user?.id;
      if (userId === undefined) {
        throw new UnauthorizedError('UserId is not authenticated.');
      }
      const result = await this.searchPostService.execute(validatedPostSchema.search, userId as number);

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
