import { Request } from 'express';

import { UnauthorizedError } from '../../helpers/api-erros';
import { PostRepository } from '../../repositories/post.repository';

class CreatePostService {
  async execute(req: Request) {
    const { title, content } = req.body;
    const userId = req.user?.id;
    if (userId === undefined) {
      throw new UnauthorizedError('Usuário não autenticado.');
    }
    const postRepository = new PostRepository();
    const post = await postRepository.savePost(title, content, userId);
    return post;
  }
}

export { CreatePostService };
