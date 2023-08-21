import { compare } from 'bcryptjs';
import { Request } from 'express';

import { UnauthorizedError } from '../../helpers/api-erros';
import { UserRepository } from '../../repositories/user.repository';

class UpdateUserService {
  async execute(req: Request) {
    const { name, email, password, old_password } = req.body;
    const userId = req.user?.id;
    if (!Number.isInteger(userId)) {
      throw new UnauthorizedError('userId inválido');
    }
    if (!userId) {
      throw new UnauthorizedError('Usuário não autenticado');
    }
    const userRepository = new UserRepository();
    const userExists = await userRepository.findByUser(userId);

    if (!userExists) {
      throw new UnauthorizedError(`Usuário não encontrado.`);
    }
    const userWithUpdatedEmail = await userRepository.findByEmail(email);
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
    }
    const user = await userRepository.updateUser(name, email, password, userId);
    return user;
  }
}
export { UpdateUserService };
