import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request,Response } from "express";
import * as bcrypt from 'bcrypt';

export class UserMiddleWare implements NestMiddleware{
    async use(req: Request, res: Response, next: NextFunction) {
        const userNamePattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]\\|:;"'<>,.?/])\S{8,}$/;

        if(!req.body.userName){
            return res.status(400).json({
                massage:"Pleas enter username."
            })  
        }else if(!req.body.userName.match(userNamePattern)){
            return res.status(400).json({
                massage:"Invalid username."
            })
        }

        if(!req.body.password){
            return res.status(400).json({
                massage:"Pleas enter password."
            })  
        }else if(!req.body.password.match(passwordPattern)){
            return res.status(400).json({
                massage:"Please enter valid password Uppercase letters && Lowercase letters && Numbers && Symbols && more then 8 charactor"
            }) 
        }
        req.body.role=req.body.role.trim()
        if(!req.body.role){
            return res.status(400).json({
                massage:"Pleas enter role."
            })  
        }

        let newPass=req.body.password.toString();
        req.body.password = await bcrypt.hash(newPass, 10);
        next();        
    }
}