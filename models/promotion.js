'use strict';
module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define('Promotion', {
    promotionName: {
      type: DataTypes.STRING,
      field: 'promotion_name'
    },
    promotionDescription: {
      type: DataTypes.TEXT,
      field: 'promotion_description'
    }
  }, {
    underscored: true,
    timestamp: true,
    tableName: 'Promotion'
  });
  Promotion.associate = function (models) {
    // associations can be defined here
    Promotion.belongsToMany(models.Product, {
      through: models.ProductPromotion,
      foreignKey: 'promotionId',
      onDelete: 'CASCADE'
    });

    Promotion.hasMany(models.SaleCode, {
      foreignKey: 'promotionId',
      onDelete: 'CASCADE'
    });
  };
  return Promotion;
};