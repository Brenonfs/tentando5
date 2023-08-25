import { Request, Response, NextFunction } from 'express';
import { verify, Secret } from 'jsonwebtoken';

import { jwtConfig } from '../configs/auth';
import { UnauthorizedError } from '../helpers/api-erros';

declare module 'express-serve-static-core' {
  // isso aqui q eu n entendi direito
  interface Request {
    user?: {
      id: number;
    };
  }
}

const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('JWT Token não informado');
  }

  const [, token] = authHeader.split(' ');

  try {
    if (jwtConfig && jwtConfig.secret !== undefined) {
      const decodedToken = verify(token, jwtConfig.secret) as { sub: string };
      req.user = {
        id: Number(decodedToken.sub),
      };
      return next();
    } else {
      throw new Error('JWT configuration is not properly set');
    }
  } catch {
    throw new UnauthorizedError('JWT Token invalid');
  }
};

export { ensureAuthenticated };
