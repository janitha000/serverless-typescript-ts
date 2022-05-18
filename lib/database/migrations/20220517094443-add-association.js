'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn(
      'Cities', // name of Source model
      'CityCodeId', // name of the key we're adding 
      {
        type: Sequelize.UUID,
        references: {
          model: 'CityCodes', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ),
    queryInterface.addColumn(
      'CityCodes', // name of Source model
      'CityId', // name of the key we're adding 
      {
        type: Sequelize.UUID,
        references: {
          model: 'Cities', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Cities', 'CityCodeId'),
      queryInterface.removeColumn('CityCodes', 'CityId')
    ]);
  }
};
