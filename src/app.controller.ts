import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './core/auth/auth.service';
import { LocalAuthGuard } from './core/auth/guards/local-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';

@Controller('/')
export class AppController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

}
