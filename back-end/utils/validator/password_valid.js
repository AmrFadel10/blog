const joi = require("joi");

exports.forgetPasswordValid = (obj) => {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email(),
  });
  return schema.validate(obj);
};

exports.resetPasswordValid = (obj) => {
  const schema = joi.object({
    password: joi.string().min(8).max(100),
  });
  return schema.validate(obj);
};
