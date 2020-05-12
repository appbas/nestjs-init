import { AllowNull, AutoIncrement, BeforeCreate, Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';
import { generateHashPassword, comparePasswords } from '../utils/hash.util';
import { BaseModel } from './base-model.model';

@Table({
  modelName: 'user',
  initialAutoIncrement: '1'
})
export class User extends BaseModel<User> {

  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  iduser: 0;

  // idfile: number;

  @Column
  login: string;

  @Column
  passwordhash: string;

  @Column
  dateTimeConfirmate: Date;
  
  @Column
  registerhash: string;

  @Column(DataType.VIRTUAL)
  password;

  checarSenha(password) {
    return comparePasswords(password, this.passwordhash);
  }

  @BeforeCreate
  static async beforeCreateUser(user: User, options: any, err: any) {

      // if (user.login) {

      //   user.registerhash = crypto.createHmac('sha256', auth.secret)
      //     .update(user.login)
      //     .digest('hex');
      // }

      // const hash = async () => {
      //   // return await 
      //   return bcrypt.hash(user.password, 8);;
      // }console.log();

      if (user.password) {
        user.passwordhash = await generateHashPassword(user.password);
      }  
  }

}