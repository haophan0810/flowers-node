'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Category_discounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      discount_value: {
        type: Sequelize.INTEGER
      },
      discount_unit: {
        type: Sequelize.STRING
      },
      date_created: {
        type: Sequelize.DATE
      },
      valid_until: {
        type: Sequelize.DATE
      },
      coupon_code: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Category_discounts');
  }
};