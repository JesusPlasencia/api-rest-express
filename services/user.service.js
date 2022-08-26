const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');

class UserService {
  constructor() {
    this.users = [];
    this.pool = pool;
    this.pool.on('error', (err) => {
      console.error(err);
    });
  }

  async create(data) {
    return data;
  }

  async find() {
    const query = 'Select * from tasks';
    const users = await pool.query(query);
    if (users.rows.length === 0) {
      throw boom.notFound('Users Not Found');
    }
    return users.rows;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return {
      id,
    };
  }
}

module.exports = UserService;
