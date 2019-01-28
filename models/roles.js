'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    roleName: {
      unique: true,
      type: DataTypes.STRING,
      field: 'role_name'
    },
    roleDescription: {
      type: DataTypes.TEXT,
      field: 'role_description'
    }
  }, {
    underscored: true,
    tableName: 'Roles',
    timestampt: true
  });
  Role.associate = function(models) {
    // associations can be defined here
    Role.belongsToMany(models.Permission, {
      through: models.RolePermission,
      foreignKey: 'roleId',
      onDelete: 'CASCADE'
    });
  };
  return Role;
};