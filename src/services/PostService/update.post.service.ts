import { Request } from 'express';

import { UnauthorizedError } from '../../helpers/api-erros';
import { PostRepository } from '../../repositories/post.repository';

class UpdatePostService {
  async execute(req: Request) {
    const { id } = req.params;
    const { title, content } = req.body;

    const postRepository = new PostRepository();
    const postExists = await postRepository.findById(Number(id));
    if (!postExists) {
      throw new UnauthorizedError('Post não encontrado');
    }
    const post = await postRepository.updatePost(title, content, Number(id));
    return post;
  }
}
export { UpdatePostService };
