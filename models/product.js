'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    productName: {
      type: DataTypes.STRING,
      field: 'product_name'
    },
    productDescription: {
      type: DataTypes.TEXT,
      field: 'product_description'
    },
    productStar: {
      type: DataTypes.STRING,
      field: 'product_star'
    },
    productCost: {
      type: DataTypes.STRING,
      field: 'product_cost'
    },
    productImage: {
      type: DataTypes.STRING,
      field: 'product_image'
    },
    productQuantity: {
      type: DataTypes.STRING,
      field: 'product_quantity'
    }
  }, {
    underscored: true,
    timestamp: true,
    tableName: 'Product'
  });
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsToMany(models.Category, {
      through: models.ProductCategory,
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });

    Product.belongsToMany(models.Cart, {
      through: models.CartProduct,
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });

    Product.belongsToMany(models.Promotion, {
      through: models.ProductPromotion,
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    })

  };
  return Product;
};