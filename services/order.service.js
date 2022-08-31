const boom = require('@hapi/boom');
const { sequelize } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await sequelize.models.Order.create(data);
    return newOrder;
  }

  async find() {
    const orders = await sequelize.models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const foundOrder = await sequelize.models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          // include: ['user'],
        },
        'items',
      ],
    });
    if (!foundOrder) {
      throw boom.notFound('Order Not Found');
    }
    return foundOrder;
  }

  async update(id, changes) {
    const foundOrder = await this.findOne(id);
    const rta = await foundOrder.update(changes);
    return rta;
  }

  async delete(id) {
    const foundOrder = await this.findOne(id);
    await foundOrder.destroy();
    return {
      id,
    };
  }
}

module.exports = OrderService;
