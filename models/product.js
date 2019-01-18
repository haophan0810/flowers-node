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
    },
    codeSaleId: {
      type: DataTypes.INTEGER,
      field: 'code_sale_id',
      references: {
        model: 'code_sale',
        key: 'id',
      },
      onDelete: 'CASCADE'
    }
  }, {
    underscored: true,
    timestamp: true,
    tableName: 'product'
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
    });

    Product.belongsTo(models.CodeSale, {      
      foreignKey: 'codeSaleId',
      onDelete: 'CASCADE'
    })

  };
  return Product;
};