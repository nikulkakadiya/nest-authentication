import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/user/schema/User";
import { UserService } from "src/user/user.service";

@Injectable()
export class RoleGuard implements CanActivate {



    constructor(private readonly reflector: Reflector,private userService:UserService) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        const data=await this.userService.findOne(user._id);
        return requiredRoles.includes(data.role);
    }
}