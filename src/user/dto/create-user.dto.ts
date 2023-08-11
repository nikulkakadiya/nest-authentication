import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    readonly userName:string;

    @IsNotEmpty()
    @IsString()
    readonly password:string;

    @IsNotEmpty()
    @IsString()
    readonly role:string;
}
