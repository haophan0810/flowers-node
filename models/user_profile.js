'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define('UserProfile', {
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name'
    },
    lastName: {
      type:  DataTypes.STRING,
      field: 'last_name'
    },
    age: DataTypes.STRING,
    avatar: DataTypes.STRING,
    phone: DataTypes.STRING    
  }, {
    underscored: true,
    tableName: 'User_profiles',
    timestampt: true
  });
  UserProfile.associate = function(models) {
    // associations can be defined here
    UserProfile.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return UserProfile;
};