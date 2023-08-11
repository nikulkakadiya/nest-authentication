import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/User';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel:Model<UserDocument>){

  }

  create(createUserDto: CreateUserDto) : Promise<User> {
    const model=new this.userModel();
    model.userName=createUserDto.userName;
    model.password=createUserDto.password;
    model.role=createUserDto.role;
    return model.save();
  }

  async findByUserName(userName:string):Promise<any | undefined>{
    const user:any=await this.userModel.findOne({userName:userName})    
    return user;
  }

  async login(loginUserDto:LoginUserDto){
    let {userName,password}=loginUserDto;
    const user=await this.userModel.findOne({userName:userName})

    if(!user){
      throw new UnauthorizedException('Invalid email and password');
    }

    const isCheck=await bcrypt.compare(password,user.password)
    if(!isCheck){
      throw new UnauthorizedException('Invalid email and password');
    }
    return user;
  }

  findAll() : Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string) : Promise<User> {
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({_id:id},{
      userName:updateUserDto.userName,
      password:updateUserDto.password,
      role:updateUserDto.role
    }).exec();
  }

  remove(id: string) {
    return this.userModel.deleteOne({_id:id}).exec();
  }
}
