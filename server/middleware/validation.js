const Joi = require('joi');

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(6).required(),
  location: Joi.string().allow('', null),
  description: Joi.string().allow('', null),
  occupation: Joi.string().allow('', null),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().required(),
});

const photoSchema = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().trim().required(),
  description: Joi.string().allow('', null),
});
const commentSchema = Joi.object({
  comment: Joi.string().trim().required(),
});

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map((d) => d.message),
    });
  }

  req.body = value;
  next();
};

module.exports = { registerSchema, loginSchema, photoSchema, commentSchema, validate };