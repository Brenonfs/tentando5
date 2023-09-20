import { UnauthorizedError } from '../../helpers/api-erros';
import { PostRepository } from '../../repositories/post.repository';

class UpdatePostService {
  async execute(id: string, title: string, content: string, userId: number) {
    // if (userId === undefined) {
    //   throw new UnauthorizedError('Usuário não autenticado.');
    // } to tirando isso pq n ta fazendo diferença
    const postRepository = new PostRepository();
    const postExists = await postRepository.findById(Number(id));
    if (!postExists) {
      throw new UnauthorizedError('Post não encontrado');
    }
    if (userId !== postExists.userId) {
      throw new UnauthorizedError('Nenhum post foi encontrado.');
    }
    const post = await postRepository.updatePost(title, content, Number(id));
    return post;
  }
}
export { UpdatePostService };
