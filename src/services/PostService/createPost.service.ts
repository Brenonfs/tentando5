import { PostRepository } from '../../repositories/post.repository';

class CreatePostService {
  async execute(title: string, content: string, userId: number) {
    const postRepository = new PostRepository();
    const post = await postRepository.savePost(title, content, userId);
    return post;
  }
}

export { CreatePostService };
