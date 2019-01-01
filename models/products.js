'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    productId: {type: DataTypes.INTEGER, field: 'product_id'},
    productName: {type: DataTypes.STRING, field: 'product_name'},
    star: {type: DataTypes.INTEGER, field: 'star'},
    promotion_id: {type: DataTypes.INTEGER, field: 'promotion_id'},
    description: {type: DataTypes.TEXT, field: 'description'},
    productCost: {type: DataTypes.STRING, field: 'product_cost'},
    productImage: {type: DataTypes.STRING, field: 'product_image'},
    productQuantity: {type: DataTypes.INTEGER, field: 'product_quantity'}
  }, {
    underscored: true,
    tableName: 'products',
    timestampt: true
  });
  Products.associate = function(models) {
    // associations can be defined here
    Products.belongToMany(models.Categories,{
      as: 'Belong',
      through: 'ProductCategories',
      foreignKey: 'productId'
    });
    
  };
  return Products;
};