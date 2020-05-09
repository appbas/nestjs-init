'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    return queryInterface.addColumn({
      tableName: 'user', schema: 'epw'
    }, 'idfile',
      {
        type: Sequelize.INTEGER,
        references: { model: 'file', key: 'idfile' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn({
      tableName: 'user', schema: 'epw'
    }, 'idfile');
  }
};
