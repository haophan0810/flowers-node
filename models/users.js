'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {type: DataTypes.STRING, field: 'user_id'},
    firstName: {type: DataTypes.STRING, field: 'first_name'},
    userName: {type: DataTypes.STRING, field: 'user_name'},
    lastName: {type: DataTypes.STRING, field: 'last_name'},
    email: {type: DataTypes.STRING, field: 'email'},
    gener: {type: DataTypes.STRING, field: 'gener'},
    age: {type: DataTypes.INTEGER, field: 'age'},
    phone: {type: DataTypes.STRING, field: 'phone'}
  }, {
    underscored: true,
    tableName: 'users',
    timestamp: true
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};