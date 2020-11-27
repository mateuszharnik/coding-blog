import Joi from 'joi';
import { emailRegExp } from '@server/helpers/regexp';

const schema = Joi.object().keys({
  name: Joi.string().trim().min(3).max(50)
    .required(),
  email: Joi.string().trim().regex(emailRegExp).required(),
  subject: Joi.string().trim().min(10)
    .max(250)
    .required(),
  content: Joi.string().trim().min(10).max(2500)
    .required(),
  readed: Joi.boolean().default(false),
});

export default schema;
