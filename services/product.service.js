const boom = require('@hapi/boom');
const faker = require('faker');
const pool = require('../libs/postgres.pool');

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => {
      console.error(err);
    });
  }

  generate() {
    //
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
    return this.products;
  }

  async create(data) {
    //
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    //
    const query = 'Select * From tasks';
    const products = await this.pool.query(query);
    if (products.rows.length == 0) {
      throw boom.notFound('Products Not Found');
    }
    return products.rows;
  }

  async findOne(id) {
    //
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('Product Not Found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

  async update(id, data) {
    //
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product Not Found');
    }
    const product = this.products[index];
    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }
    this.products[index] = {
      ...product,
      ...data,
    };
    return this.products[index];
  }

  async delete(id) {
    //validating existence
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product Not Found');
    }
    //validating lock
    const product = this.products[index];
    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }
    //removing from initial array
    this.products.splice(index, 1);
    //showing the id of the removed product
    return { id };
  }
}

module.exports = ProductService;
