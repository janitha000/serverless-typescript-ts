'use strict';
const { DataTypes } = require('sequelize')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('People', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('PeopleCity', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      peopleId: {
        type: DataTypes.UUID,
        references: {
          model: 'People', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
      },
      cityId: {
        type: DataTypes.UUID,
        references: {
          model: 'Cities', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PeopleCity');

    await queryInterface.dropTable('People');
  }
};
