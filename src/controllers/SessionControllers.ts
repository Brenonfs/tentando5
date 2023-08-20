import { Request, Response } from 'express';

import { UnauthorizedError } from '../helpers/api-erros';
import { CreateSessionService } from '../services/SessionService/create.session.service';

export class CreateSession {
  async create(req: Request, res: Response) {
    try {
      const createSessionService = new CreateSessionService();
      const result = await createSessionService.execute(req);

      return res.json({
        error: false,
        message: 'Sucess',
        result,
      });
    } catch (error) {
      throw new UnauthorizedError(`Erro ao iniciar a session: ${error}`);
    }
  }
}