import { hash, compare } from 'bcryptjs';
import { Request, Response } from 'express';

import { prisma } from '../database';
import { UnauthorizedError } from '../helpers/api-erros';

export class CreateUser {
  async handle(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const userExists = await prisma.user.findUnique({
        where: { email },
      });

      if (userExists) {
        throw new UnauthorizedError(`Este email ja está em uso.`);
      }

      const hashedPassword = await hash(password, 8);
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });

      return res.json({
        error: false,
        message: 'Sucess: user created',
        user,
      });
    } catch (error) {
      throw new UnauthorizedError(`Não foi possível criar o usuário: ${error}`);
    }
  }
}
export class UpdateUser {
  async handle(req: Request, res: Response) {
    const { name, email, password, old_password } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedError('Usuário não autenticado');
    }
    const userExists = await prisma.user.findUnique({
      where: { id: Number(userId) }, // acho q to fazendo 2 vezes
    });
    if (!userExists) {
      throw new UnauthorizedError(`Usuário não encontrado.`);
    }
    const userWithUpdatedEmail = await prisma.user.findFirst({
      where: { email },
    });
    // userWithUpdatedEmail && userWithUpdatedEmail.id !== userExists.id)
    if (userWithUpdatedEmail && email !== undefined) {
      throw new UnauthorizedError(`Email já em uso.`);
    }
    userExists.name = name ?? userExists.name;
    userExists.email = email ?? userExists.email;
    if (password && !old_password) {
      throw new UnauthorizedError(`Você precisa informa a senha antiga para a nova`);
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, userExists.password);

      if (!checkOldPassword) {
        throw new UnauthorizedError(`A senha antiga não confere`);
      }

      // userExists.password = await hash(password,8);
    }

    const hashedPassword = await hash(password, 8);
    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        name,
        email,
        password: hashedPassword, // falta alterar
      },
    });
    return res.json({
      error: false,
      message: 'updated user successfully',
      user,
    });
  }
}
