const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkAPIKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkAdminRole(req, res, next) {
  //
  const user = req.user;
  console.log(user.role);
  if (user.role === 'Admin') {
    next();
  } else {
    next(
      boom.unauthorized(
        "You don't have the required privileges to perform this task."
      )
    );
  }
}

function checkRoles(roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(
        boom.unauthorized(
          "You don't have the required privileges to perform this task."
        )
      );
    }
  };
}

module.exports = { checkAPIKey, checkAdminRole, checkRoles };
