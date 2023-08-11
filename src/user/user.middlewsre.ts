import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request,Response } from "express";
import * as bcrypt from 'bcrypt';

export class UserMiddleWare implements NestMiddleware{
    async use(req: Request, res: Response, next: NextFunction) {
        let newPass=req.body.password.toString();
        req.body.password = await bcrypt.hash(newPass, 10);
        next();        
    }
}