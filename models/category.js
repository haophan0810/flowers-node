'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryName: {
      type: DataTypes.STRING,
      field: 'category_name'
    },
    categoryNameSlug: {
      type: DataTypes.STRING,
      field: 'category_name_slug'
    },
    categoryDescription: {
      type:  DataTypes.TEXT,
      field: 'category_description'
    }
  }, {
    underscored: true,
    timestampt: true,
    tableName: 'Categories'
  });
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsToMany(models.Product, {
      through: models.ProductCategory,
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    })

    Category.hasMany(models.CategoryDiscount, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    })
  };
  return Category;
};