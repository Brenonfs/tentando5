import { UnauthorizedError } from '../../helpers/api-erros';
import { PostRepository } from '../../repositories/post.repository';

class UpdatePostService {
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  async execute(id: string, title: string, content: string, userId: number) {
    const postExists = await this.postRepository.findById(Number(id));
    if (!postExists) {
      throw new UnauthorizedError('Post não encontrado');
    }
    if (userId !== postExists.userId) {
      throw new UnauthorizedError('Nenhum post foi encontrado.');
    }
    const post = await this.postRepository.updatePost(title, content, Number(id));
    return post;
  }
}
export { UpdatePostService };
