'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    roleId: {
      type: DataTypes.INTEGER,
      field: 'role_id',
      references: {
        model: 'Roles',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    underscored: true,
    timestampt: true,
    tableName: 'User_roles'

  });
  UserRole.associate = function(models) {
    // associations can be defined here
  };
  return UserRole;
};