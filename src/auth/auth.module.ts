import { Module, forwardRef } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports:[forwardRef(() => UserModule),PassportModule,
        JwtModule.register({
            secret: 'key',
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers:[LocalStrategy,JwtStrategy,AuthService],
    exports:[AuthService]
})
export class AuthModule{

}