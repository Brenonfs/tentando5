import express, { Request, Response } from 'express';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';
import { UnauthorizedError } from './helpers/api-erros';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

app.use((error: UnauthorizedError, req: Request, res: Response) => {
  if (error instanceof UnauthorizedError) {
    // gerado pelo cliente
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    status: 'error',
    message: 'internal error',
    // qual o status? 500?
  });
});

export { app };
