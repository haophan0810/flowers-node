'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
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
    comment_title: DataTypes.STRING,
    comment_content: DataTypes.TEXT,
    active: DataTypes.BOOLEAN
  }, {
    underscored: true,
    tableName: 'Comments',
    timestampt: true
  });
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Product, {      
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });

    Comment.belongsTo(models.User, {      
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Comment;
};