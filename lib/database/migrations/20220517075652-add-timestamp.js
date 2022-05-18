'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'CityCodes',
        'createdAt',
        {
          type: Sequelize.DATE
        }
      ),
      queryInterface.addColumn(
        'CityCodes',
        'updatedAt',
        {
          type: Sequelize.DATE
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('CityCodes', 'createdAt'),
      queryInterface.removeColumn('CityCodes', 'updatedAt')
    ]);
  }
};
