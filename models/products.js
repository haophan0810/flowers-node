'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    productName: {
      type: DataTypes.STRING,
      field: 'product_name'
    },
    productNameSlug: {
      type: DataTypes.STRING,
      field: 'product_name_slug'
    },
    productDescription: {
      type: DataTypes.TEXT,
      field: 'product_description',
    },
    productStar: {
      type: DataTypes.FLOAT,
      field: 'product_star'
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      field: 'product_quantity'
    },
    totalUserVote: {
      type: DataTypes.INTEGER,
      field: 'total_user_vote'
    },
  }, {
    underscored: true,
    tableName: 'Products',
    timestampt: true
  });
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.ProductPricing, {
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });

    Product.hasMany(models.ProductDiscount, {
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });

    Product.hasMany(models.ProductImage, {
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });

    Product.belongsToMany(models.Category, {
      through: models.ProductCategory,
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });

    Product.hasMany(models.ReviewsProduct, {
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });

    Product.hasMany(models.UserVoteProduct, {
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });

    Product.belongsToMany(models.User, {
      through: models.UserVoteProduct,
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });

    // Product.belongsToMany(models.Cart, {
    //   through: models.CartItem,
    //   foreignKey: 'productId',
    //   onDelete: 'CASCADE'
    // });

    Product.belongsToMany(models.User, {
      through: models.CartItem,
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });
  };

  

  return Product;
};