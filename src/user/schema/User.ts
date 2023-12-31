import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument=User&Document;

@Schema()
export class User{

    @Prop({unique:[true,'Duplicate email']})    
    userName:string;

    @Prop()
    password:string;

    @Prop()
    role:string;
}

export const UserSchema=SchemaFactory.createForClass(User);