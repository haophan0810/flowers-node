'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    productCode: {type:DataTypes.STRING, field: 'first_code'},
    productName: {type:DataTypes.STRING, field: 'product_name'},
    productStore: {type:DataTypes.STRING, field: 'product_store'},
    quantity: DataTypes.INTEGER,
    state: DataTypes.STRING,
    productCost: {type:DataTypes.INTEGER, field: 'product_cost'},
    description: DataTypes.STRING,
    star: DataTypes.INTEGER,
    srcImage: {type:DataTypes.STRING, field: 'src_image'},
    note: DataTypes.STRING
  }, {
    underscored: true,
    tableName:'products',
    timestampt: true
  });
  Products.associate = function(models) {
    // associations can be defined here
  };
  return Products;
};