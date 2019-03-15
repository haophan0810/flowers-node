'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductPricing = sequelize.define('ProductPricing', {
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
      references: {
        models: 'Products',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    basePrice: {
      type: DataTypes.INTEGER,
      field: 'base_price'
    },
    dateExpiry: {
      type: DataTypes.DATE,
      field: 'date_expiry'
    }
  }, {
    underscored: true,
    tableName: 'Product_pricings',
    timestampt: true
  });
  ProductPricing.associate = function(models) {
    // associations can be defined here
    ProductPricing.belongsTo(models.Product, {      
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    })
  };
  return ProductPricing;
};