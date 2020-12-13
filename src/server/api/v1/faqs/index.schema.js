import Joi from 'joi';

const schema = Joi.object().keys({
  question: Joi.string().trim().min(10).max(500)
    .required(),
  answer: Joi.string().trim().min(10).max(5000)
    .required(),
});

export default schema;
