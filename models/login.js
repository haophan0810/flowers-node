'use strict';
module.exports = (sequelize, DataTypes) => {
  const Login = sequelize.define('Login', {
    user_name: {type: DataTypes.STRING, field: 'user_name'},
    password_salt: {type: DataTypes.STRING, field: 'password_salt'},
    password_hash: {type: DataTypes.STRING, field: 'password_hash'},
    user_id: {type: DataTypes.STRING, field: 'user_id'}
  }, {
    underscored: true,
    tableName: 'logins',
    timestamp: true
  });
  Login.associate = function(models) {
    // associations can be defined here
    Login.belongsTo(models.User);
  };
  return Login;
};