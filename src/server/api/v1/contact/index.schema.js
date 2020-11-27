import Joi from 'joi';
import { emailRegExp } from '@server/helpers/regexp';

const schema = Joi.object().keys({
  email: Joi.string().trim().allow('').regex(emailRegExp)
    .required(),
  show_email: Joi.boolean().default(false).required(),
});

export default schema;
