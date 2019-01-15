'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    quantity: {
      type: DataTypes.INTEGER,
      field: 'quantity'
    },
    totalBill: {
      type: DataTypes.FLOAT,
      field: 'total_bill'
    },
    userId: {
      type: DataTypes.INTEGER,      
      field: 'user_id',
      onDelete: 'SET NULL',
      references: {
        model: 'User',
        key: 'id'
      },
    },
  }, {
    underscored: true,
    timestamp: true,
    tableName: 'Cart'
  });
  Cart.associate = function (models) {
    // associations can be defined here
    Cart.belongsToMany(models.Product, {
      through: models.ProductCart,
      foreignKey: 'cartId',
      onDelete: 'CASCADE'
    });

    Cart.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'SET NULL'
    })
  };
  return Cart;
};