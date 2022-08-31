'use strict';

const { UserSchema, USER_TABLE } = require('../models/user.model');

module.exports = {
  async up(queryInterface) {
    //Adding role column to User's table | function addColumn()
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
  },

  async down(queryInterface) {
    //Removing role column to User's table | function removeColumn()
    await queryInterface.removeColumn(USER_TABLE, 'role');
  },
};
