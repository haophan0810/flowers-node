'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('ProductImage', {
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
      references: {
        models: 'Products',
        key: 'id',
        onDelete: 'CASCADE'
      }
    },
    imageName: {
      type: DataTypes.STRING,
      field: 'image_name'
    }
  }, {
    underscored: true,
    tableName: 'Product_images',
    timestampt: true
  });
  ProductImage.associate = function(models) {
    // associations can be defined here
    ProductImage.belongsTo(models.Product, {      
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    })
  };
  return ProductImage;
};