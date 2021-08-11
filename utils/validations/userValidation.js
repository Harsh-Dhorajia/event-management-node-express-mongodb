const Joi = require("joi");

const schemas = {
  register: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),

  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),

  changePassword: Joi.object().keys({
    currentPassword: Joi.string().required().min(8),
    newPassword: Joi.string().required().min(8),
  }),
};
module.exports = schemas;
