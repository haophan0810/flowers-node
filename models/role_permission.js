'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role_permission = sequelize.define('Role_permission', {
    roleId: {
      type: DataTypes.INTEGER,
      field: 'role_id',
      references: {
        model: 'Roles',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    permissionId: {
      type: DataTypes.INTEGER,
      field: 'permission_id',
      references: {
        model: 'Permissions',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    underscored: true,
  });
  Role_permission.associate = function(models) {
    // associations can be defined here
  };
  return Role_permission;
};