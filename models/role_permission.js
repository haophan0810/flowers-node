'use strict';
module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define('RolePermission', {
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
    tableName: 'Role_permissions',
    timestampt: true
  });
  RolePermission.associate = function(models) {
    // associations can be defined here
  };
  return RolePermission;
};