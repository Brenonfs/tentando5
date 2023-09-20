import { Request, Response } from 'express';

import { UnauthorizedError } from '../helpers/api-erros';
import { sessionCreateSchema } from '../schemas/session';
import { CreateSessionService } from '../services/SessionService/createSession.service';

export class CreateSession {
  async create(req: Request, res: Response) {
    try {
      const validatedSessionSchema = sessionCreateSchema.parse(req.body);
      const createSessionService = new CreateSessionService();
      const result = await createSessionService.execute(validatedSessionSchema.email, validatedSessionSchema.password);

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
