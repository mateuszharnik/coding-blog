import Joi from 'joi';
import { genders } from '@server/helpers/constants';

const { MALE, FEMALE } = genders;

const schema = Joi.object().keys({
  name: Joi.string().trim().min(3).max(50)
    .required(),
  description: Joi.string().trim().min(10).max(2000)
    .required(),
  gender: Joi.string().trim().allow(MALE, FEMALE).required(),
  image: Joi.string().trim().allow('').required(),
  social_media: Joi.object().keys({
    facebook: Joi.string().trim().allow('').required(),
    twitter: Joi.string().trim().allow('').required(),
    github: Joi.string().trim().allow('').required(),
    instagram: Joi.string().trim().allow('').required(),
  }).required(),
});

export default schema;
