import Joi from 'joi';
import { emailRegExp } from '@client/helpers/regexp';

const schema = Joi.object().keys({
  name: Joi.string().trim().min(3).max(50)
    .required(),
  email: Joi.string().trim().regex(emailRegExp)
    .required(),
  subject: Joi.string().trim().min(10).max(200)
    .required(),
  content: Joi.string().trim().min(30).max(5000)
    .required(),
  terms_accepted: Joi.boolean().valid(true).required(),
});

export default schema;
