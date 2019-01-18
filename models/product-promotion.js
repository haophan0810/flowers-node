'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductPromotion = sequelize.define('ProductPromotion', {
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
      onDelete: 'CASCADE',
      references: {
        model: 'product',
        key: 'id'
      }
    },
    promotionId: {
      type: DataTypes.INTEGER,
      field: 'promotion_id',
      onDelete: 'CASCADE',
      references: {
        model: 'promotion',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    tableName: 'product_promotion',
    timestamp: true
  });
  ProductPromotion.associate = function(models) {
    // associations can be defined here
  };
  return ProductPromotion;
};