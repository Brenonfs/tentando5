import { hash } from 'bcryptjs';

import { prisma } from '../database';

export class UserRepository {
  users = [];
  async findByEmail(email: string) {
    const userExists = await prisma.user.findFirst({
      where: { email },
    });
    return userExists;
  }
  async saveUser(name: string, email: string, password: string, idPerson: number) {
    const hashedPassword = await hash(password, 8);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, idPerson },
    });
    return user;
  }
  async findByUser(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    return user;
  }
  async updateUser(name: string, email: string, password: string, userId: any, idPerson: number) {
    const hashedPassword = await hash(password, 8);
    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        name,
        email,
        password: hashedPassword,
        idPerson, // falta alterar
      },
    });
    return user;
  }
}

export default new UserRepository();
