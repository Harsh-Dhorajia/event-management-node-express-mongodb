const Joi = require("joi");

const schemas = {
  create: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.string().required(),
  }),

  inviteUser: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};
module.exports = schemas;
