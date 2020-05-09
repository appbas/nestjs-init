import { Injectable, Inject } from '@nestjs/common';
import { User } from '../core/models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof User){}

  create(createUserDto: CreateUserDto) {

    const user = new User();
    user.login = createUserDto.login;
    user.passwordhash = createUserDto.password;
    
    this.usersRepository.create(
      Object.assign({} as User, { login: createUserDto.login, password: createUserDto.password }));
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

}
