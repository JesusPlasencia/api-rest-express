const boom = require('@hapi/boom');
const { sequelize } = require('../libs/sequelize');

class CategoryService {
  constructor() {}

  async create(data) {
    const newCategory = await sequelize.models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await sequelize.models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const foundCategory = await sequelize.models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!foundCategory) {
      throw boom.notFound('Category Not Found');
    }
    return foundCategory;
  }

  async update(id, changes) {
    const foundCategory = await this.findOne(id);
    const rta = await foundCategory.update(changes);
    return rta;
  }

  async delete(id) {
    const foundCategory = await this.findOne(id);
    await foundCategory.destroy();
    return {
      id,
    };
  }
}

module.exports = CategoryService;
