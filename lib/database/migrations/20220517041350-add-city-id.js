'use strict';

const { DataTypes } = require('sequelize')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'id')
    await queryInterface.addColumn('Users', 'id', {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'id', {
      type: DataTypes.NUMBER,
      primaryKey: true,
      allowNull: false
    });
  }
};
