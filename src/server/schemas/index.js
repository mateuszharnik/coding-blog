import Joi from 'joi';
import { idRegExp } from '@server/helpers/regexp';

// eslint-disable-next-line import/prefer-default-export
export const idSchema = Joi.string().trim().regex(idRegExp).required();
