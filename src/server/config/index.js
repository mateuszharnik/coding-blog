import Joi from 'joi';
import { config } from 'dotenv';

config();

const schema = Joi.object().keys({
  NODE_ENV: Joi.string().trim().default('development').valid('development', 'production', 'test'),
  SERVER_PORT: Joi.string().trim().default('3000'),
  SERVER_URL: Joi.string().trim().default('http://localhost:3000'),
  CLIENT_URL: Joi.string().trim().default('http://localhost:8080'),
  DB_URL: Joi.string().trim().default('mongodb://localhost/db'),
  EXAMPLE_DATA: Joi.boolean().default(true),
}).unknown(true);

const { error, value } = schema.validate(process.env);

if (error) {
  // eslint-disable-next-line no-console
  console.error(`Missing property in config file: ${error.message}`);
  process.exit(1);
}

export default value;
