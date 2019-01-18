'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
      onDelete: 'CASCADE',
      references: {
        model: 'product',
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id',
      onDelete: 'CASCADE',
      references: {
        model: 'category',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    timestamp: true,
    tableName: 'product_category'
  });
  ProductCategory.associate = function (models) {
    // associations can be defined here
  };
  return ProductCategory;
};