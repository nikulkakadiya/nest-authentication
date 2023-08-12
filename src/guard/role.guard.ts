import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/user/schema/User";
import { UserService } from "src/user/user.service";

@Injectable()
export class RoleGuard implements CanActivate{

    private rolePassed:string[]=[];

    constructor(role:string[]){
        this.rolePassed=[...role];
    }

    createRoleGuard(role: string[]) {
        this.rolePassed=[...role];
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx=context.switchToHttp();
        const request:any=ctx.getRequest<Request>();
        return this.rolePassed.includes(request.user.role);
    }
}