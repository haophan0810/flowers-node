'use strict';
module.exports = (sequelize, DataTypes) => {
  const DiscountCodes = sequelize.define('DiscountCodes', {
    discountIDd: {type:DataTypes.INTEGER, field: 'discount_id'},
    promotionId: {type: DataTypes.INTEGER, field: 'promotion_id'},
    discountValue: {type:DataTypes.INTEGER, field: 'discount_value'},
    discountName: {type: DataTypes.STRING, field: 'discount_name'},
    discountDescription: {type: DataTypes.TEXT, field: 'discount_description'}
  }, {
    underscored: true,
    tableName: 'discount_codes',
    timestampt: true,
  });
  DiscountCodes.associate = function(models) {
    // associations can be defined here
  };
  return DiscountCodes;
};