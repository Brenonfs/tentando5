import {Request, Response} from 'express';
import { prisma } from '../database';
import { UnauthorizedError } from '../helpers/api-erros';
import {hash,compare} from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { jwtConfig } from '../configs/auth';

export class CreateSession{
    async handle(req: Request,res: Response){
        try {
            const {email, password} = req.body;
            const userExist = await prisma.user.findFirst({
                where: { email }
            });

            if(!userExist) {
                throw new UnauthorizedError("Email e/ou senha incorreta")
            }
            const passwordMatched = await compare(password, userExist.password);

            if(!passwordMatched) {
                throw new UnauthorizedError("Email e/ou senha incorreta")
            }

            const {secret, expiresIn} = jwtConfig;
            const token = sign({}, secret, {
            subject: String(userExist.id),
            expiresIn: expiresIn
            })

            return res.json({userExist,token});
        } catch (error) {
            throw new UnauthorizedError("Erro ao iniciar a session")
        }
    }    
}    