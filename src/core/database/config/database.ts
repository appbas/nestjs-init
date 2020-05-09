import { Options } from "sequelize/types";

export default {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '9238',
  // username: user,
  // password: password,
  database: 'cta',
  schema: 'epw',
  quoteIdentifiers: false,
  define: {
    timestamps: false,
    underscored: false,
    underscoredAll: false,
    paranoid: false,
    freezeTableName: true,
    quoteIdentifiers: false,
    createdAt   : 'dateTimeCreate',
    updatedAt   : 'dateTimeUpdate',
    // tableName: 'user'
  },
} as Options ;
