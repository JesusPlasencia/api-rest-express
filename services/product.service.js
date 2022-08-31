const boom = require('@hapi/boom');
const { sequelize } = require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductService {
  constructor() {}

  async create(data) {
    //
    const newProduct = await sequelize.models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    //
    const options = {
      include: ['category'],
      where: {},
    };
    //
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    //
    const { price } = query;
    if (price) {
      options.where.price = price;
    }
    //
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        //
        [Op.between]: [price_min, price_max],
      };
    }
    //
    const products = await sequelize.models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const foundProduct = await sequelize.models.Product.findByPk(id);
    if (!foundProduct) {
      throw boom.notFound('Product Not Found');
    }
    return foundProduct;
  }

  async update(id, changes) {
    const foundProduct = await this.findOne(id);
    const rta = await foundProduct.update(changes);
    return rta;
  }

  async delete(id) {
    const foundProduct = await this.findOne(id);
    await foundProduct.destroy();
    return {
      id,
    };
  }
}

module.exports = ProductService;
