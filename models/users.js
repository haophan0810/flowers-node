'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    sid: DataTypes.UUID,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash:{
      type:  DataTypes.STRING,
      field: 'password_hash'
    },
    passwordSalt: {
      type:  DataTypes.STRING,
      field: 'password_salt'
    },
    
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

    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};