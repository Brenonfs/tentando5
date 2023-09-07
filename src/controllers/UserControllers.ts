import axios from 'axios';
import { Request, Response } from 'express';

import { UnauthorizedError } from '../helpers/api-erros';
import { CreateUserService } from '../services/UserService/createUser.service';
import { UpdateUserService } from '../services/UserService/updateUser.service';
const baseUrl = 'http://localhost:5001';

export class UserControllers {
  async create(req: Request, res: Response) {
    try {
      const { name, email, password, cpf, dataNascimento } = req.body;
      const body = { name, cpf, dataNascimento };
      const response = await axios.post(`${baseUrl}/people/`, body);
      const idPerson = response.data.result.id;
      const createUserService = new CreateUserService();
      const result = await createUserService.execute(name, email, password, idPerson);
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
    const { name, email, password, old_password, idPerson } = req.body;
    const userId = req.user?.id;
    try {
      const updateUserService = new UpdateUserService();
      const result = await updateUserService.execute(name, email, password, old_password, idPerson, userId);

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
