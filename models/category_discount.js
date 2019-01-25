'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategoryDiscount = sequelize.define('CategoryDiscount', {
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id',
      references: {
        model: 'Categories',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    discountValue: {
      type: DataTypes.INTEGER,
      field: 'discount_value'
    },
    discountUnit: {
      type:  DataTypes.STRING,
      field: 'discount_unit'
    },
    dateCreated: {
      type: DataTypes.DATE,
      field: 'date_created'
    },
    validUntil: {
      type: DataTypes.DATE,
      field: 'valid_until'
    },
    couponCode: {
      type:  DataTypes.STRING,
      field: 'coupon_code'
    }
  }, {
    underscored: true,
    tableName: 'Category_discounts',
    timestampt: true
  });
  CategoryDiscount.associate = function(models) {
    // associations can be defined here
  };
  return CategoryDiscount;
};