'use strict';

const { USER_TABLE } = require('../models/user.model');
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    //Adding role column to User's table | function addColumn()
    await queryInterface.addColumn(USER_TABLE, 'role', {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'Customer',
    });
  },

  async down(queryInterface) {
    //Removing role column to User's table | function removeColumn()
    await queryInterface.removeColumn(USER_TABLE, 'role');
  },
};
