const boom = require('@hapi/boom');
const { sequelize } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await sequelize.models.User.create(data);
    return newUser;
  }

  async find() {
    const users = await sequelize.models.User.findAll();
    return users;
  }

  async findOne(id) {
    const foundUser = await sequelize.models.User.findByPk(id);
    if (!foundUser) {
      throw boom.notFound('User Not Found');
    }
    return foundUser;
  }

  async update(id, changes) {
    const foundUser = await this.findOne(id);
    const rta = await foundUser.update(changes);
    return rta;
  }

  async delete(id) {
    const foundUser = await this.findOne(id);
    await foundUser.destroy();
    return {
      id,
    };
  }
}

module.exports = UserService;
