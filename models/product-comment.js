'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductComment = sequelize.define('ProductComment', {
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
      onDelete: 'CASCADE',
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    commentId: {
      type: DataTypes.INTEGER,
      field: 'comment_id',
      onDelete: 'CASCADE',
      references: {
        model: 'Comment',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    tableName: 'Product-comment',
    timestamp:true
  });
  ProductComment.associate = function(models) {
    // associations can be defined here
  };
  return ProductComment;
};