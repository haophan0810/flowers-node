'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    expires: {
      type: DataTypes.DATE,
      field: 'expries'
    },
    data: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    underscored: true,
    tableName: 'Sessions',
    timestampt: true
  });
  Session.associate = function(models) {
    // associations can be defined here
    Session.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  };
  return Session;
};