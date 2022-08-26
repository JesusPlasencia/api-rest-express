const { ValidationError } = require('sequelize');

function sqlErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      errorSql: err.name,
      message: err.errors.map((e) => e.message)[0],
    });
  }
  next(err);
}

module.exports = { sqlErrorHandler };
