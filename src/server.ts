import express from 'express'
import { Request, Response, NextFunction} from 'express';

import {router} from './routes'
import { UnauthorizedError } from './helpers/api-erros';

const app = express();

app.use(express.json());
app.use(router);

app.use((error: UnauthorizedError, req:Request,res: Response, next: NextFunction)=>{
    if(error instanceof UnauthorizedError){ // gerado pelo cliente
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message,
        });
    }

    console.error(error);

    return res.status(500).json({
        status: "error",
        message: "internal error",
        // qual o status? 500?
    });
});


app.listen(5000,() => console.log(`Server is running at 5000`));// quando a aplicação iniciar, essa mensagem vai aparecer "listen"