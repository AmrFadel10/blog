const joi = require("joi");

exports.createPostValid = (obj) => {
  const schema = joi.object({
    title: joi.string().trim().min(3).max(100).required(),
    description: joi.string().trim().min(10).max(1000).required(),
    category: joi.string().trim().min(3).required(),
  });
  return schema.validate(obj);
};

exports.updatePostValid = (obj) => {
  const schema = joi.object({
    title: joi.string().trim().min(3).max(100),
    description: joi.string().trim().min(10).max(1000),
    category: joi.string().trim().min(3),
  });
  return schema.validate(obj);
};
