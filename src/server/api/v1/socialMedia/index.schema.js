import Joi from 'joi';
import { facebookRegExp, twitterRegExp, instagramRegExp } from '@server/helpers/regexp';

const schema = Joi.object().keys({
  facebook: Joi.string().trim().allow('').regex(facebookRegExp)
    .required(),
  twitter: Joi.string().trim().allow('').regex(twitterRegExp)
    .required(),
  instagram: Joi.string().trim().allow('').regex(instagramRegExp)
    .required(),
});

export default schema;
