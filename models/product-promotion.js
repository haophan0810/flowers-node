'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductPromotion = sequelize.define('ProductPromotion', {
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
      onDelete: 'CASCADE',
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    promotionId: {
      type: DataTypes.INTEGER,
      field: 'promotion_id',
      onDelete: 'CASCADE',
      references: {
        model: 'Promotion',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    tableName: 'Product-promotion',
    timestamp: true
  });
  ProductPromotion.associate = function(models) {
    // associations can be defined here
  };
  return ProductPromotion;
};