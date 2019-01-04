'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ones = sequelize.define('Ones', {
    oneId: {type:DataTypes.INTEGER, field: 'one_id'},
    oneName: {type:DataTypes.STRING, field: 'one_name'}
  }, {
    underscored: true,
    tableName: 'ones',
    timestampt: true
  });
  Ones.associate = function(models) {
    // associations can be defined here
    Ones.hasMany(models.Many);
  };
  return Ones;
};