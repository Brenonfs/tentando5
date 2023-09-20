import axios from 'axios';
import { Request, Response } from 'express';

import { UnauthorizedError } from '../helpers/api-erros';
import { CreateUserService } from '../services/UserService/createUser.service';
import { UpdateUserService } from '../services/UserService/updateUser.service';
const baseUrl = process.env.DATABASE_PESSOAS_URL;

export class UserControllers {
  async create(req: Request, res: Response) {
    try {
      const { name, email, password, cpf } = req.body;
      const secret = req.headers.secret;

      const response = await axios.get(`${baseUrl}/people?cpf=${cpf}`, {
        headers: {
          secret,
        },
      });

      if (!response) {
        throw new UnauthorizedError(`Essa pessoa ainda não é cadastrada`);
      }
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
  // async update(req: Request, res: Response) {
  //   const { name, email, password, old_password, idPerson } = req.body;
  //   const userId = req.user?.id;
  //   try {
  //     const updateUserService = new UpdateUserService();
  //     const result = await updateUserService.execute(name, email, password, old_password, idPerson, userId);

  //     return res.json({
  //       error: false,
  //       message: 'Sucess: user updated',
  //       result,
  //     });
  //   } catch (error) {
  //     throw new UnauthorizedError(`Não foi possível atualizar o usuário: ${error}`);
  //   }
  // }
}
