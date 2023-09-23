import { UnauthorizedError } from '../../helpers/api-erros';
import { PostRepository } from '../../repositories/post.repository';

class SearchPostService {
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  async execute(search: string, userId: number) {
    if (userId === undefined) {
      throw new UnauthorizedError('Usuário não autenticado.');
    } // aqui faz diferença
    const postExists = await this.postRepository.findBySearch(search, userId);
    if (!postExists || postExists.length === 0) {
      throw new UnauthorizedError('Nenhum post foi encontrado por conta q ta vazio ou não existe.');
    }
    return postExists;
  }
}
export { SearchPostService };
