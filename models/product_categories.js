'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategories = sequelize.define('ProductCategories', {
    productId: {type: DataTypes.INTEGER, field: 'product_id'},
    categoryId: {type: DataTypes.INTEGER, field: 'category_id'}
  }, {
    underscored: true,
    tableName: 'product_categories',
    timestampt: true,
  });
  ProductCategories.associate = function(models) {
    // associations can be defined here
  };
  return ProductCategories;
};