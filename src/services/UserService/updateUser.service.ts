import { compare } from 'bcryptjs';
import { Request } from 'express';

import { UnauthorizedError } from '../../helpers/api-erros';
import { UserRepository } from '../../repositories/user.repository';

class UpdateUserService {
  async execute(name: string, email: string, password: string, old_password: string, idPerson: number, userId: number) {
    // if (!Number.isInteger(userId)) {
    //   throw new UnauthorizedError('userId inválido');
    // }
    if (!userId) {
      throw new UnauthorizedError('Usuário não autenticado');
    } // isso eu n consigo verificar
    const userRepository = new UserRepository();
    const userExists = await userRepository.findByUser(userId);

    if (!userExists) {
      throw new UnauthorizedError(`Usuário não encontrado.`);
    } // isso eu n consigo verificar
    const userWithUpdatedEmail = await userRepository.findByEmail(email);
    if (userWithUpdatedEmail && email !== undefined) {
      throw new UnauthorizedError(`Email já em uso.`);
    }
    userExists.name = name ?? userExists.name;
    userExists.email = email ?? userExists.email;
    userExists.idPerson = idPerson ?? userExists.idPerson;

    if (password && !old_password) {
      throw new UnauthorizedError(`Você precisa informa a senha antiga para a nova`);
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, userExists.password);
      if (!checkOldPassword) {
        throw new UnauthorizedError(`A senha antiga não confere`);
      }
    }
    const user = await userRepository.updateUser(name, email, password, userId, idPerson);
    return user;
  }
}
export { UpdateUserService };
