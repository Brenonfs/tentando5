import { Request, Response } from 'express';

import { prisma } from '../database';
import { UnauthorizedError } from '../helpers/api-erros';

export class CreatePost {
  async handle(req: Request, res: Response) {
    try {
      const { title, content } = req.body;
      const userId = req.user?.id;

      if (userId === undefined) {
        throw new UnauthorizedError('Usuário não autenticado.');
      }

      const post = await prisma.post.create({
        data: { title, content, userId },
      });

      return res.json({
        error: false,
        message: 'Sucess: post created',
        post,
      });
    } catch (error) {
      throw new UnauthorizedError('Erro ao crear o Post');
    }
  }
}
export class ListPost {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const post = await prisma.post.findUnique({
        where: { id: Number(id) },
      });
      if (!post) {
        return res.json({
          error: true,
          message: 'Não foi encontrado nenhum post',
        });
      }

      return res.json({
        error: false,
        message: 'Aqui está o post procurado',
        post,
      });
    } catch (error) {
      throw new UnauthorizedError('Não foi possivel encontrar o Post');
    }
  }
}
export class UpdatePost {
  async handle(req: Request, res: Response) {
    try {
      const { id, title, content } = req.body;

      const postExist = await prisma.post.findUnique({
        where: { id: Number(id) },
      });
      if (!postExist) {
        return res.json({
          error: true,
          message: 'Não foi encontrado nenhum post',
        });
      }

      const post = await prisma.post.update({
        where: {
          id: Number(req.body.id), // preciso ver isso
        },
        data: {
          title,
          content,
        },
      });

      return res.json({
        error: false,
        message: 'O post foi atualizado',
        post,
      });
    } catch (error) {
      throw new UnauthorizedError('Não foi possivel atualizar o Post');
    }
  }
}
export class DeletePost {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const postExist = await prisma.post.findUnique({
        where: { id: Number(id) },
      });
      if (!postExist) {
        return res.json({
          error: true,
          message: 'Não foi encontrado nenhum post',
        });
      }
      const post = await prisma.post.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      return res.json({
        error: false,
        message: 'O post foi deletado com sucesso',
        post,
      });
    } catch (error) {
      throw new UnauthorizedError('Não foi possivel deletar o Post');
    }
  }
}
