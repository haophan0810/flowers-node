'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReviewsProduct = sequelize.define('ReviewsProduct', {
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
      references: {
        model: 'Products',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    reviewTitle: {
      type: DataTypes.STRING,
      field: 'review_title'
    },
    reviewContent: {
      type: DataTypes.TEXT,
      field: 'review_content'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'is_active'
    }
  }, {
    underscored: true,
    tableName: 'Reviews_products',
    timestampt: true
  });
  ReviewsProduct.associate = function(models) {
    // associations can be defined here
    ReviewsProduct.belongsTo(models.Product, {      
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });

    ReviewsProduct.belongsTo(models.User, {      
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return ReviewsProduct;
};