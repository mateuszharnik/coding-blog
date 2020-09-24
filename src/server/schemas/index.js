import Joi from 'joi';

const idRegExp = /^[a-f\d]{24}$/i;

const idSchema = Joi.string().trim().regex(idRegExp).required();

export default idSchema;
