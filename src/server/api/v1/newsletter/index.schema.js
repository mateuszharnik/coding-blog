import Joi from 'joi';
import { emailRegExp } from '@server/helpers/regexp';

const schema = Joi.object().keys({
  email: Joi.string().trim().regex(emailRegExp).required(),
});

export default schema;
