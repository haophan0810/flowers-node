'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserAddress = sequelize.define('UserAddress', {
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    fullName: {
      type: DataTypes.STRING,
      field: 'full_name'
    },
    phoneNumber: {
      type: DataTypes.STRING,
      field: 'phone_number'
    },
    kindAddress: {
      type: DataTypes.STRING,
      field: 'kind_address'
    },
    street: {
      type: DataTypes.STRING,
      field: 'street'
    },
    distric: {
      type: DataTypes.STRING,
      field: 'distric'
    },
    city: {
      type: DataTypes.STRING,
      field: 'city'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'is_active'
    },
    address: {
      type: DataTypes.STRING,
      field: 'address'
    }
  }, {
    underscored: true,
    tableName: 'User_addresses',
    timestampt: true
  });
  UserAddress.associate = function(models) {
    // associations can be defined here
    UserAddress.belongsTo(models.User, {      
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return UserAddress;
};