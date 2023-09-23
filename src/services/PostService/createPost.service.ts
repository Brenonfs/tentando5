import { PostRepository } from '../../repositories/post.repository';

class CreatePostService {
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  async execute(title: string, content: string, userId: number) {
    const post = await this.postRepository.savePost(title, content, userId);
    return post;
  }
}

export { CreatePostService };
