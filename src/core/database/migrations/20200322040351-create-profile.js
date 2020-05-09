'use strict';

const TABLE_NAME = 'profile';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(TABLE_NAME,
      {
        iduser: {
          type: Sequelize.INTEGER,
          references: { model: 'user', key: 'iduser' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        dateBorn: {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
        dateTimeCreate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        dateTimeUpdate: {
          type: Sequelize.DATE,
          allowNull: false,
        }
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
