import { UnauthorizedError } from '../../helpers/api-erros';
import { UserRepository } from '../../repositories/user.repository';

class CreateUserService {
  async execute(name: string, email: string, password: string, idPerson: number) {
    const userRepository = new UserRepository();
    const userExists = await userRepository.findByEmail(email);
    if (userExists) {
      throw new UnauthorizedError(`Este email ja está em uso.`);
    }
    const user = await userRepository.saveUser(name, email, password, idPerson);
    return user;
  }
}

export { CreateUserService };
