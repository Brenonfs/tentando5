import { UnauthorizedError } from '../../helpers/api-erros';
import { PeopleApi } from '../../integrations/people-api';
import { UserRepository } from '../../repositories/user.repository';

class CreateUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(name: string, email: string, password: string, idPerson: number) {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new UnauthorizedError(`Este email ja está em uso.`);
    }
    const user = await this.userRepository.saveUser(name, email, password, idPerson);
    return user;
  }
  async apiExterna(secret: string, body: object) {
    const peopleApi = new PeopleApi(secret);
    const idPerson = await peopleApi.createPerson(body);
    return idPerson;
  }
}

export { CreateUserService };
