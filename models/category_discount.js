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
    timeExpired: {
      type: DataTypes.DATE,
      field: 'time_expired'
    },
    isActive: {
      type:  DataTypes.BOOLEAN,
      field: 'is_active'
    }
  }, {
    underscored: true,
    tableName: 'Category_discounts',
    timestampt: true
  });
  CategoryDiscount.associate = function(models) {
    // associations can be defined here
    CategoryDiscount.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    })
  };
  return CategoryDiscount;
};