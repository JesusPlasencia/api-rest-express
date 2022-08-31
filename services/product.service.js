const boom = require('@hapi/boom');
const { sequelize } = require('../libs/sequelize');

class ProductService {
  constructor() {}

  async create(data) {
    //
    const newProduct = await sequelize.models.Product.create(data);
    return newProduct;
  }

  async find() {
    //
    const products = await sequelize.models.Product.findAll({
      include: ['category'],
    });
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
