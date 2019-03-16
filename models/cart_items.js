'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'user_id'
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      },
      field: 'product_id'
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT
  }, {
    underscored: true,
    timestampt: true,
    tableName: 'Cart_items'
  });
  CartItem.associate = function(models) {
  };
  return CartItem;
};