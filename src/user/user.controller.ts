import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Response } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { RoleGuard } from 'src/guard/role.guard';
import { Roles } from 'src/guard/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private readonly authService:AuthService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto,@Response() res) {
    const userName=await this.userService.findByUserName(createUserDto.userName);
    if(userName){
      return res.status(400).json({
        massage:"Duplicate username.."
      })
    }
    const data=await this.userService.create(createUserDto);
    return res.status(200).json({
      data
    })
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req):Promise<string>{    
    return await this.authService.generateToken(req.user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Roles('admin','user')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Roles('admin','user')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Roles('admin')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Roles('admin')
  async remove(@Param('id') id: string,@Response() res):Promise<string> {
    
    const data=await this.userService.remove(id);
    if(data.deletedCount!=0){
      return res.status(200).json({
        massage:"data deleted..."
      })
    }
    return res.status(400).json({
      massage:"data not available..."
    })
  }
}
