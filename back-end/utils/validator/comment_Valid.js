const joi = require("joi");

// validation for create comment
exports.createCommentValid = (obj) => {
  const schema = joi.object({
    postId: joi.string().required(),
    description: joi.string().max(1000).required(),
  });
  return schema.validate(obj);
};

// validation for update comment
exports.updateCommentValid = (obj) => {
  const schema = joi.object({
    description: joi.string().max(1000).required().trim(),
  });
  return schema.validate(obj);
};
