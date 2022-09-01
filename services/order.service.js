const boom = require('@hapi/boom');
const { sequelize } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const foundCustomer = await sequelize.models.Customer.findOne({
      where: {
        userId: data.userId,
      },
    });
    if (!foundCustomer) {
      throw boom.notFound('Customer Not Found');
    }
    const newOrder = await sequelize.models.Order.create({
      ...data,
      customerId: foundCustomer.id,
    });
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

  async findOrdersByUser(id) {
    // Finding an specific customer by userId
    const customer = await sequelize.models.Customer.findOne({
      where: {
        userId: id,
      },
    });
    if (!customer) {
      throw boom.notFound('Customer Not Found');
    }
    const customerId = await customer.id;
    // Finding an specific orders by customerId
    const orders = await sequelize.models.Order.findAll({
      where: {
        customerId,
      },
      include: ['items'],
    });
    if (!orders) {
      throw boom.notFound('Orders Not Found');
    }
    return orders;
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
