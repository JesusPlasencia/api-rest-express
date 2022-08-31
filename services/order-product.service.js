const boom = require('@hapi/boom');
const { sequelize } = require('../libs/sequelize');

class OrderProductService {
  constructor() {}

  async create(data) {
    ///
    const foundProduct = await sequelize.models.Product.findByPk(
      data.productId
    );
    if (!foundProduct) {
      throw boom.notFound('Product Not Found');
    }
    ///
    const foundOrder = await sequelize.models.Order.findByPk(data.orderId);
    if (!foundOrder) {
      throw boom.notFound('Order Not Found');
    }
    ///
    const newOrderProduct = await sequelize.models.OrderProduct.create(data);
    return newOrderProduct;
  }

  async find() {
    const items = await sequelize.models.OrderProduct.findAll();
    return items;
  }

  async findOne(id) {
    const foundItem = await sequelize.models.OrderProduct.findByPk(id);
    if (!foundItem) {
      throw boom.notFound('Item Not Found');
    }
    return foundItem;
  }

  async update(id, changes) {
    const foundItem = await this.findOne(id);
    const rta = await foundItem.update(changes);
    return rta;
  }

  async delete(id) {
    const foundItem = await this.findOne(id);
    await foundItem.destroy();
    return {
      id,
    };
  }
}

module.exports = OrderProductService;
