import { UnauthorizedError } from '../../helpers/api-erros';
import { PostRepository } from '../../repositories/post.repository';

class ListPostService {
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  async execute(id: string, userId: number) {
    const postExists = await this.postRepository.findById(Number(id));
    if (!postExists) {
      throw new UnauthorizedError('Nenhum post foi encontrado.');
    }
    if (userId !== postExists.userId) {
      throw new UnauthorizedError('Nenhum post foi encontrado.');
    }
    return postExists;
  }
}
export { ListPostService };
