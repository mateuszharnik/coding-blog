import Joi from 'joi';

const schema = Joi.object().keys({
  description: Joi.string().trim().min(10).max(2000)
    .required(),
});

export default schema;
