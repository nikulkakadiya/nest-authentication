import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/user/schema/User";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private userService:UserService){
        super();
    }

    async validate(username:string,password:string) : Promise<any>{
        const user:any=await this.userService.findByUserName(username);      
        if (!user==undefined || user==null) {
            throw new UnauthorizedException("Valid email and password");
        }
        const isCheck=await bcrypt.compare(password,user.password)
        if (user!=undefined && isCheck) {
            return user;
        }else{
            throw new UnauthorizedException("Valid email and password");
        }
    }
}