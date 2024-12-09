const joi = require("joi");

exports.createUserValid = (obj) => {
  const schema = joi.object({
    username: joi.string().trim().min(2).required(),
    email: joi.string().trim().min(5).max(100).required().email(),
    password: joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
};

exports.updateUserValid = (obj) => {
  const schema = joi.object({
    username: joi.string().trim().min(2).max(20),
    email: joi.string().trim().min(5).max(100).email(),
    password: joi.string().min(8).max(100),
    bio: joi.string(),
  });
  return schema.validate(obj);
};
exports.loginUserValid = (obj) => {
  const schema = joi.object({
    email: joi.string().required().trim().min(5).max(100).email(),
    password: joi.string().required().trim().min(5).max(100),
  });
  return schema.validate(obj);
};
