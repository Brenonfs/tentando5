import { Request, Response } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies

import { BadRequestError, UnauthorizedError } from '../helpers/api-erros';
import { userCreateSchema, userUpdateSchema } from '../schemas/user';
import { CreateUserService } from '../services/UserService/createUser.service';
import { UpdateUserService } from '../services/UserService/updateUser.service';

export class UserControllers {
  private createUserService: CreateUserService;
  private updateUserService: UpdateUserService;

  constructor() {
    this.createUserService = new CreateUserService();
    this.updateUserService = new UpdateUserService();
  }

  async create(req: Request, res: Response) {
    try {
      const validatedUserSchema = userCreateSchema.parse(req.body);
      const body = {
        name: validatedUserSchema.name,
        cpf: validatedUserSchema.cpf,
        dataNascimento: validatedUserSchema.dataNascimento,
      };
      const secret = req.headers.secret;

      const idPerson = await this.createUserService.apiExterna(secret as string, body);

      const result = await this.createUserService.execute(
        validatedUserSchema.name,
        validatedUserSchema.email,
        validatedUserSchema.password,
        idPerson,
      );
      return res.json({
        error: false,
        message: 'Sucesso: usuário criado',
        result,
      });
    } catch (error) {
      console.error('Erro durante a execução do método create:', error);
      throw new BadRequestError(`Não foi possível criar o usuário: ${error}`);
    }
  }

  async update(req: Request, res: Response) {
    const validatedUserSchema = userUpdateSchema.parse(req.body);
    const userId = req.user?.id;
    try {
      if (userId === undefined) {
        throw new UnauthorizedError('Usuário não está autenticado.');
      }
      const result = await this.updateUserService.execute(
        validatedUserSchema.name,
        validatedUserSchema.email,
        validatedUserSchema.password,
        validatedUserSchema.old_password,
        validatedUserSchema.idPerson,
        userId as number,
      );

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
