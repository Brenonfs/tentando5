import { Request } from 'express';

import { UnauthorizedError } from '../../helpers/api-erros';
import { PostRepository } from '../../repositories/post.repository';

class SearchPostService {
  async execute(req: Request) {
    const search = req.query.search as string;
    const userId = req.user?.id;
    if (userId === undefined) {
      throw new UnauthorizedError('Usuário não autenticado.');
    }
    const postRepository = new PostRepository();
    const postExists = await postRepository.findBySearch(search, userId);
    if (!postExists || postExists.length === 0) {
      throw new UnauthorizedError('Nenhum post foi encontrado por conta q ta vazio ou não existe.');
    }
    return postExists;
  }
}
export { SearchPostService };
