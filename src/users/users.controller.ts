import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { User } from '../core/models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

 

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  

}