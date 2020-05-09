'use strict';

const TABLE_NAME = 'parameter';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(TABLE_NAME,
      {
        codparameter: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
        },
        value: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        schema: 'epw',
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable({
      tableName: TABLE_NAME,
      freezeTableName: true,
      quoteIdentifiers: false,
      schema: 'epw'
    });
  }
};
