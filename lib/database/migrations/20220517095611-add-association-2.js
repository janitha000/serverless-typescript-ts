'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // return queryInterface.addColumn(
    //   'CityCodes', // name of Source model
    //   'CityClassId', // name of the key we're adding 
    //   {
    //     type: Sequelize.UUID,
    //     references: {
    //       model: 'Cities', // name of Target model
    //       key: 'id', // key in Target model that we're referencing
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'SET NULL',
    //   }
    // )
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Cities', 'CityCodeId'),
      queryInterface.removeColumn('CityCodes', 'CityId')
    ]);
  }
};
