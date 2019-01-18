'use strict';
module.exports = (sequelize, DataTypes) => {
  const CodeSale = sequelize.define('CodeSale', {
    codeName: {
      type: DataTypes.STRING,
      field: 'code_name'
    },
    codeValue: {
      type: DataTypes.INTEGER,
      field: 'code_value'
    }
  }, {
    underscored: true,
    timestamp: true,
    tableName: 'code_sale'
  });
  CodeSale.associate = function(models) {
    // associations can be defined here
    CodeSale.hasMany(models.Product, {
      foreignKey: 'codeSaleId',
      onDelete: 'CASCADE'
    });
  };
  return CodeSale;
};