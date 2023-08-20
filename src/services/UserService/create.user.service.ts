import { Request } from 'express';

import { UnauthorizedError } from '../../helpers/api-erros';
import { UserRepository } from '../../repositories/user.repository';

class CreateUserService {
  async execute(req: Request) {
    const { name, email, password } = req.body;
    const userRepository = new UserRepository();
    const userExists = await userRepository.findByEmail(email);
    if (userExists) {
      throw new UnauthorizedError(`Este email ja está em uso.`);
    }
    const user = await userRepository.saveUser(name, email, password);
    return user;
  }
}

export { CreateUserService };
