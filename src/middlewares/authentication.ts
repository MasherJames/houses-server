import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class Authentication {
    static verifyToken(req: Request, res: Response, next: NextFunction){
        const reqUrl = req.originalUrl;
        if (reqUrl === '/api/auth/login' || reqUrl === '/api/auth/register') {
            return next();
        }

        let token: string;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            return res.status(401).json({
                status: 'error',
                error: 'Unauthorised request',
            });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err: any, decoded: object) => {
            if (err) {
                return res.status(403).json({
                    status: 'error',
                    error: 'Token expired, please log in again',
                });
            }
            req['user'] = decoded;
            return next();
        });
    }
}