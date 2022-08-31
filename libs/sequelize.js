const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setUpModels = require('../db/models/index');

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(config.dbUrl, options);

setUpModels(sequelize);

// sequelize.sync();

module.exports = { sequelize };
