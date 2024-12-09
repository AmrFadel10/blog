const joi = require("joi");

exports.createCatgeoryValid = (obj) => {
  const schema = joi.object({
    title: joi.string().trim().required(),
  });
  return schema.validate(obj);
};

exports.updateCatgeoryValid = (obj) => {
  const schema = joi.object({
    title: joi.string().trim().required(),
  });
  return schema.validate(obj);
};
