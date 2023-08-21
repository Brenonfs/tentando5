import { Request } from 'express';

import { UnauthorizedError } from '../../helpers/api-erros';
import { PostRepository } from '../../repositories/post.repository';

class DeletePostService {
  async execute(req: Request) {
    const { id } = req.params;
    const userId = req.user?.id;
    if (userId === undefined) {
      throw new UnauthorizedError('Usuário não autenticado.');
    }
    const postRepository = new PostRepository();
    const postExists = await postRepository.findById(Number(id));
    if (!postExists) {
      throw new UnauthorizedError('Nenhum post foi encontrado.');
    }
    if (userId !== postExists.userId) {
      throw new UnauthorizedError('Nenhum post foi encontrado.');
    }
    const post = await postRepository.deletePost(Number(id));
    return post;
  }
}
export { DeletePostService };
