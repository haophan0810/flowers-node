'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Session', {
      sid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      expries: {
        type: Sequelize.DATE
      },
      date: {
        type: Sequelize.TEXT
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Session');
  }
};