'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_promotion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER,        
        onDelete: 'CASCADE',
        references: {
          model: 'product',
          key: 'id'
        }
      },
      promotion_id: {
        type: Sequelize.INTEGER,        
        onDelete: 'CASCADE',
        references: {
          model: 'promotion',
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
    return queryInterface.dropTable('product_promotion');
  }
};