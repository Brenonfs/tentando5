import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import crypto from 'node:crypto';

export class InMemoryUserRepository {
  users = [];
  public itens: User[] = [];

  async findByEmail(email: string) {
    const userExists = await prisma.user.findFirst({
      where: { email },
    });
    return userExists;
  }
  public idCounter = 1;
  async saveUser(name: string, email: string, password: string) {
    const id: number = this.idCounter++;
    this.itens.push({ id, name, email, password });
  }
  async findByUser(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    return user;
  }
  async updateUser(name: string, email: string, password: string, userId: any) {
    const hashedPassword = await hash(password, 8);
    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        name,
        email,
        password: hashedPassword, // falta alterar
      },
    });
    return user;
  }
}

export default new InMemoryUserRepository();
