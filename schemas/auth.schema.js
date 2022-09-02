const Joi = require('joi');

const token = Joi.string().min(20);
const newPassword = Joi.string().min(8);

const newPasswordSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
});

module.exports = {
  newPasswordSchema,
};
