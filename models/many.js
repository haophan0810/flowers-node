'use strict';
module.exports = (sequelize, DataTypes) => {
  const Many = sequelize.define('Many', {
    manyId: {type: DataTypes.INTEGER, field: 'many_id'},
    oneId: {type:DataTypes.INTEGER, field: 'one_id'},
    manyName: {type:DataTypes.STRING, field: 'many_name'}
  }, {
    underscored: true,
    tableName:'manies',
    timestampt:true
  });
  Many.associate = function(models) {
    // associations can be defined here
    Many.belongsTo(models.Ones);
  };
  return Many;
};