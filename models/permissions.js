'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    permissionName: {
      type: DataTypes.STRING,
      field: 'permission_name',
      unique: true
    },
    permissionDescription: {
      type: DataTypes.TEXT,
      field: 'permission_description'
    }
  }, {
    underscored: true,
    tableName: 'Permissions',
    timestampt: true
  });
  Permission.associate = function(models) {
    // associations can be defined here
    Permission.belongsToMany(models.Role, {
      through: models.ProductCategory,
      foreignKey: 'permissionId',
      onDelete: 'CASCADE'
    });
  };
  return Permission;
};