import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Observable, of } from 'rxjs';
import { User } from '../core/models/user.entity';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/teste')
  teste(): Observable<string> {
    return of('Teste');
  }

  

}