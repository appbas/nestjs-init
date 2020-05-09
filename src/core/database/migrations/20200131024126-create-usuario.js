'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user',
      {
        iduser: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        login: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        passwordhash: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dateTimeConfirmate: {
          type: Sequelize.DATE,
        },
        dateTimeCreate: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValut: new Date(),
        },
        dateTimeUpdate: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValut: new Date(),
        },
        registerhash: {
          type: Sequelize.STRING,
          allowNull: false
        },
      },
      {
        schema: 'epw',
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable({
      tableName: 'user',
      freezeTableName: true,
      quoteIdentifiers: false,
      schema: 'epw'
    });
  }
};
