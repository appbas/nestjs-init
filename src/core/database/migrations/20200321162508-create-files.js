'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('file',
      {
        idfile: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        path: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        dateTimeCreate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        dateTimeUpdate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        schema: 'epw',
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable({
      tableName: 'file',
      freezeTableName: true,
      quoteIdentifiers: false,
      schema: 'epw'
    });
  }
};
