'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserVoteProduct = sequelize.define('UserVoteProduct', {
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
    star: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    underscored: true,
    tableName: 'UserVoteProducts',
    timestampt: true
  });
  UserVoteProduct.associate = function(models) {
    // associations can be defined here
    UserVoteProduct.belongsTo(models.Product, {      
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });

    UserVoteProduct.belongsTo(models.User, {      
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return UserVoteProduct;
};