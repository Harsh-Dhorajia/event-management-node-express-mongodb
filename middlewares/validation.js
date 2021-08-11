const Joi = require("joi");
const validation = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      console.log("error", message);
      res.status(422).json({
        error: message,
      });
    }
    req.body = value;
    next();
  };
};
module.exports = validation;
