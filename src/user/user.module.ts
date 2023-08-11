import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/User';
import { UserMiddleWare } from './user.middlewsre';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[forwardRef(() => AuthModule),MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule implements NestModule{

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleWare).forRoutes({path:'/user/register',method:RequestMethod.POST})
  }

}
