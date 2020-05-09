'use strict';

const TABLE_NAME = 'dothour';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(TABLE_NAME,
      {
        iduser: {
          type: Sequelize.INTEGER,
          references: { model: 'user', key: 'iduser' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
        },
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
          primaryKey: true,
        },
        hour: {
          type: Sequelize.TIME,
          allowNull: false,
          primaryKey: true,
        }
      },
      {
        uniqueKeys: {
          actions_unique: {
            fields: ['iduser', 'date', 'hour']
          }
        },
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
