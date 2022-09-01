const boom = require('@hapi/boom');
const { sequelize } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async create(data) {
    const newCustomer = await sequelize.models.Customer.create(data);
    return newCustomer;
  }

  async find() {
    const customers = await sequelize.models.Customer.findAll({
      include: ['user'],
    });
    return customers;
  }

  async findOne(id) {
    const foundCustomer = await sequelize.models.Customer.findByPk(id, {
      include: ['user'],
    });
    if (!foundCustomer) {
      throw boom.notFound('Customer Not Found');
    }
    return foundCustomer;
  }

  async update(id, changes) {
    const foundCustomer = await this.findOne(id);
    const rta = await foundCustomer.update(changes);
    return rta;
  }

  async delete(id) {
    const foundCustomer = await this.findOne(id);
    await foundCustomer.destroy();
    return {
      id,
    };
  }
}

module.exports = CustomerService;
