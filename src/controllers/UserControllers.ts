import { Request, Response } from 'express';

import { UnauthorizedError } from '../helpers/api-erros';
import { CreateUserService } from '../services/UserService/createUser.service';
import { UpdateUserService } from '../services/UserService/updateUser.service';

export class UserControllers {
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const createUserService = new CreateUserService();
      const result = await createUserService.execute(name, email, password);

      return res.json({
        error: false,
        message: 'Sucess: user created',
        result,
      });
    } catch (error) {
      throw new UnauthorizedError(`Não foi possível criar o usuário: ${error}`);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const updateUserService = new UpdateUserService();
      const result = await updateUserService.execute(req);

      return res.json({
        error: false,
        message: 'Sucess: user updated',
        result,
      });
    } catch (error) {
      throw new UnauthorizedError(`Não foi possível atualizar o usuário: ${error}`);
    }
  }
}
