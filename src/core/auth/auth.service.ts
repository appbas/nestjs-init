import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(login: string, pass: string) {
    const user = await this.usersService.findOneByLogin(login);
    if (user && user.checarSenha(pass)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { login: user.login, id: user.iduser };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}