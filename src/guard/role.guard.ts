import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "src/user/user.service";

export class RoleGuard implements CanActivate{

    private rolePassed:string[]=[];
    constructor(role:string[]){
        this.rolePassed=[...role];
    }

    canActivate(context: ExecutionContext): boolean {
        const ctx=context.switchToHttp();
        const request:any=ctx.getRequest<Request>();
        return this.rolePassed.includes(request.user.role);
    }
}