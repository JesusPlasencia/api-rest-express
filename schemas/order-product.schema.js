const Joi = require('joi');

const id = Joi.number().integer();
const orderId = Joi.number().integer();
const amount = Joi.number();
const productId = Joi.number().integer();

const createItemSchema = Joi.object({
  orderId: orderId.required(),
  amount: amount.required(),
  productId: productId.required(),
});

const getItemSchema = Joi.object({
  id: id.required(),
});

const updateItemSchema = Joi.object({
  orderId: orderId,
  amount: amount,
  productId: productId,
});

module.exports = { createItemSchema, getItemSchema, updateItemSchema };
