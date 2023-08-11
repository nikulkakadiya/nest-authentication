import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:['.local.env']
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configSerice:ConfigService)=>({uri:configSerice.get("MONGO_URI")}),
      inject:[ConfigService]
    }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
