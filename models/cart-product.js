'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartProduct = sequelize.define('CartProduct', {
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
      onDelete: 'CASCADE',
      references: {
        model: 'product',
        key: 'id'
      }
    },
    cartId: {
      type: DataTypes.INTEGER,
      field: 'cart_id',
      onDelete: 'CASCADE',
      references: {
        model: 'cart',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    tableName: 'cart_product',
    timestamp: true
  });
  CartProduct.associate = function (models) {
    // associations can be defined here
  };
  return CartProduct;
};