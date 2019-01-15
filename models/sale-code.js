'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaleCode = sequelize.define('SaleCode', {
    sale_name: {
      type: DataTypes.STRING,
      field: 'sale_name'
    },
    value: {
      type: DataTypes.INTEGER,
      field: 'value'
    },
    promotion_id: {
      type: DataTypes.INTEGER,
      field: 'promotion_id',
      onDelete: 'CASCADE',
      references: {
        model: 'Promotion',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    tableName: 'Sale-code',
    timestamp: true
  });
  SaleCode.associate = function (models) {
    // associations can be defined here
    SaleCode.belongsTo(models.Promotion, {
      foreignKey: 'promotionId',
      onDelete: 'CASCADE'
    })

  };
  return SaleCode;
};