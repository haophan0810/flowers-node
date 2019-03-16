'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash:{
      type:  DataTypes.STRING,
      field: 'password_hash'
    },
    passwordSalt: {
      type:  DataTypes.STRING,
      field: 'password_salt'
    }    
  }, {
    underscored: true,
    tableName: 'Users',
    timestampt: true
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Session);

    User.hasOne(models.UserProfile);

    User.belongsToMany(models.Role, {
      through: models.UserRole,
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.ReviewsProduct, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.UserVoteProduct, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });



    User.belongsToMany(models.Product, {
      through: models.UserVoteProduct,
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    User.belongsToMany(models.Role, {
      through: models.CartItem,
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    User.belongsToMany(models.Product, {
      through: models.CartItem,
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

  };
  return User;
};