const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { sequelize } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const newUser = await sequelize.models.User.create({
      ...data,
      password: hashPassword,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const users = await sequelize.models.User.findAll({
      include: ['customer'],
    });
    return users;
  }

  async findByEmail(email) {
    const user = await sequelize.models.User.findOne({
      where: { email },
    });
    return user;
  }

  async findOne(id) {
    const foundUser = await sequelize.models.User.findByPk(id, {
      include: ['customer'],
    });
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
