'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    expries: {
      type: DataTypes.DATE,
      field: 'expries'
    },
    data: {
      type: DataTypes.TEXT,
      field: 'data'
    },
    user_id: {
      type: DataTypes.INTEGER,
      field: 'userId',
      onDelete: 'CASCADE',
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    tableName: 'Sessions',
    timestamp: true
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