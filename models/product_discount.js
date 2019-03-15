'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductDiscount = sequelize.define('ProductDiscount', {
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
      references: {
        models: 'Products',
        key: 'id',
        onDelete: 'CASCADE'
      }
    },
    discountValue: {
      type: DataTypes.INTEGER,
      field: 'discount_value'
    },
    timeExpired: {
      type: DataTypes.DATE,
      field: 'time_expired'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'is_active'
    }
  }, {
    underscored: true,
    tableName: 'Product_discounts',
    timestampt: true
  });
  ProductDiscount.associate = function(models) {
    // associations can be defined here
    ProductDiscount.belongsTo(models.Product, {      
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });
  };
  return ProductDiscount;
};