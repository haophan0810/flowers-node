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
    discountUnit: {
      type: DataTypes.STRING,
      field: 'discount_unit'
    },
    dateCreated: {
      type: DataTypes.DATE,
      field: 'date_created'
    },
    validUntil: {
      type: DataTypes.DATE,
      field: 'valid_until'
    },
    couponCode: {
      type: DataTypes.STRING,
      field: 'coupon_code'
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
    })
  };
  return ProductDiscount;
};