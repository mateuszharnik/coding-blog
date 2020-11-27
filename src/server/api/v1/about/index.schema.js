import Joi from 'joi';

const schema = Joi.object().keys({
  description: Joi.string().trim().allow('').max(5000)
    .required(),
});

export default schema;
