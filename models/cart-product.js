'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartProduct = sequelize.define('CartProduct', {
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
      onDelete: 'CASCADE',
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    cartId: {
      type: DataTypes.INTEGER,
      field: 'cart_id',
      onDelete: 'CASCADE',
      references: {
        model: 'Cart',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    tableName: 'Cart-product',
    timestamp: true
  });
  CartProduct.associate = function (models) {
    // associations can be defined here
  };
  return CartProduct;
};