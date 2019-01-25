'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
      references: {
        model: 'Products',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id',
      references: {
        model: 'Categories',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    underscored: true,
    tableName: 'Product_categories',
    timestampt: true

  });
  ProductCategory.associate = function(models) {
    // associations can be defined here
  };
  return ProductCategory;
};