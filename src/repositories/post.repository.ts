import { prisma } from '../database';

export class PostRepository {
  posts = [];
  async savePost(title: string, content: string, userId: number) {
    const post = await prisma.post.create({
      data: { title, content, userId },
    });
    return post;
  }
  async findById(id: number) {
    const postExist = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    return postExist;
  }
  async findBySearch(search: string, userId: number) {
    const postExist = await prisma.post.findMany({
      where: {
        title: {
          contains: search,
        },
        userId,
      },
    });
    return postExist;
  }
  async updatePost(title: string, content: string, id: number) {
    const post = await prisma.post.update({
      where: {
        id: Number(id), // preciso ver isso
      },
      data: {
        title,
        content,
      },
    });
    return post;
  }
  async deletePost(id: number) {
    const post = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    return post;
  }
}
