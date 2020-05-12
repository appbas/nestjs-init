import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../core/models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as Validator from 'validatorjs';


const validator = {
  'login': 'required|email',
  'password': 'min:8|max:16',
};



@Injectable()
export class UsersService {

  constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof User){}

  async create(createUserDto: CreateUserDto) {
    
    try {
      const validacao: Validator = new Validator(createUserDto, validator);
    
      if (validacao.fails()) {
        // console.log(validacao.errors.errors);
        throw new HttpException('Validation failed', HttpStatus.NOT_ACCEPTABLE);
      }
      
      const user = {} as User;
      user.login = createUserDto.login;
      user.password = createUserDto.password;
      
      await this.usersRepository.create(user);
    } catch (error) {
      throw error;
    }
  }

  /**
   *  Find user by login
   * 
   * @param login 
   */
  async findOneByLogin(login: string) {
    return await this.usersRepository.findOne({ where: { login } });
  }


  
  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

}
