'use strict';

const { USER_TABLE } = require('../models/user.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    //Adding recovery_token column to User's table | function addColumn()
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', {
      field: 'recovery_token',
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
  },

  async down(queryInterface) {
    //Removing recovery_token column to User's table | function removeColumn()
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  },
};
