'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    categoryId: {type:DataTypes.INTEGER, field:'category_id'},
    categoryName: {type:DataTypes.STRING, field:'category_name'},
    categoryDescription: {type:DataTypes.TEXT, field:'category_description'}
  }, {
    underscored: true,
    timestampt: true,
    tableName: 'categories'
  });
  Categories.associate = function(models) {
    // associations can be defined here
    Categories.belongsToMany(models.Products,{
      as: 'Contain',
      through: models.ProductCategories,
      foreignKey: 'categoryId'
    });
  };
  return Categories;
};