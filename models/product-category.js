'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
      onDelete: 'CASCADE',
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id',
      onDelete: 'CASCADE',
      references: {
        model: 'Category',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    timestamp: true,
    tableName: 'Product-category'
  });
  ProductCategory.associate = function (models) {
    // associations can be defined here
  };
  return ProductCategory;
};