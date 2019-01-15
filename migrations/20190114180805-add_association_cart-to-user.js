'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Cart', // name of Source model
      'userId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'User', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'SET NULL'
      }
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
      
    */
    return queryInterface.removeColumn(
      'Cart', // name of Source model
      'userId' // key we want to remove
    );
  }
};