'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    birthday: {
      type: DataTypes.DATE,
      field: 'birthday'
    },
    age: {
      type: DataTypes.INTEGER,
      field: 'age'
    },
    phone: {
      type: DataTypes.STRING,
      field: 'phone'
    },
    address: {
      type: DataTypes.STRING,
      field: 'address'
    },
  }, {
    underscored: true,
    tableName: 'User',
    timestamp: true
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Comment, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });

    User.hasOne(models.UserLogin);

    User.hasOne(models.Session);
    

  };
  return User;
};