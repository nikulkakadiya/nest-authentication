import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(private readonly jwtService:JwtService){
    }

    generateToken(payload:any):string{
        const {_id,role}=payload;
        return this.jwtService.sign({_id,role});
    }
}