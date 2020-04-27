import * as Joi from '@hapi/joi';

const Schema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'pre-production', 'production').default('development'),
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string(),
  JWT_EXPIRATION: Joi.string(),
  DATABASE_PORT: Joi.number(),
});

export default Schema;
