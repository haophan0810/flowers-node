'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryName: {
      type: DataTypes.STRING,
      field: 'category_name'
    },
    categoryDescription:{
      type: DataTypes.TEXT,
      field: 'category_description'
    },
    nameUrl: {
      type: DataTypes.STRING,
      field: 'name_url'
    }
  }, {
    underscored: true,
    tableName: 'category',
    timestamp: true
  });
  Category.associate = function (models) {
    // associations can be defined here
    Category.belongsToMany(models.Product, {
      through: models.ProductCategory,
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    })
  };
  return Category;
};