const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).strip();
const price = Joi.number();
const description = Joi.string().min(10).strip();
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const price_min = Joi.number();
const price_max = Joi.number();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  categoryId: categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: price_min.required(),
    then: Joi.required(),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
