const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');

class CategoryService {
  constructor() {
    this.categories = [];
    this.pool = pool;
    this.pool.on('error', (err) => {
      console.error('MESSAGE: ' + err.message);
    });
  }

  async find() {
    //
    const query = 'Select * From tasks';
    const categories = await pool.query(query);
    if (categories.rows.length === 0) {
      throw boom.notFound('Categories Not Found');
    }
    return categories.rows;
  }
}

module.exports = CategoryService;
