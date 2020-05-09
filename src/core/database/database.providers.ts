import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user.entity';

export const databaseProviders = [
  {
    
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '9238',
        database: 'cta',
        quoteIdentifiers: false,
        define: {
          timestamps: false,
          underscored: false,
          paranoid: false,
          freezeTableName: true,
          createdAt   : 'dateTimeCreate',
          updatedAt   : 'dateTimeUpdate',
          schema: 'epw'
        },

      });
      sequelize.addModels([User]);
      await sequelize.sync({
        schema: 'epw', force: false, alter: false

      })
      return sequelize;
    },
  },
  
];





// import { Sequelize } from 'sequelize';

// import { User } from '../../users/user.model';

// import databaseConfig from './config/database';


// const models = [ User ];

// class Database {
  
  

//   constructor() {
//     this.init();
//   }

//   init() {
//     const connection = new Sequelize(databaseConfig);

//     models
//     .map(model => model.init(connection, databaseConfig))
//     .map(model => model.associate && model.associate(connection.models));
//   }
// }

// export default new Database();
