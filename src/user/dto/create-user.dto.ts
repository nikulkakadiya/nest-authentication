import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {

    readonly userName:string;
    
    readonly password:string;
    
    readonly role:string;
}
