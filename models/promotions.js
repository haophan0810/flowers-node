'use strict';
module.exports = (sequelize, DataTypes) => {
  const Promotions = sequelize.define('Promotions', {
    promotionId: {type: DataTypes.INTEGER, field: 'promotion_id'},
    promotionName: {type: DataTypes.STRING, field: 'promotion_name'},
    promotionDescription: {type:DataTypes.TEXT, field: 'promotion_description'}
  }, {
    underscored: true,
    tableName: 'promotions',
    timestampt: true
  });
  Promotions.associate = function(models) {
    // associations can be defined here
    Promotions.hasMany(models.Products,{
      foreignKey: 'promotionId'
    })
  };
  return Promotions;
};