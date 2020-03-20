import * as Joi from '@hapi/joi';

const Schema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production')
        .default('development'),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string(),
    JWT_EXPIRATION: Joi.string(),
    DATABASE_PORT: Joi.number(),
    DATABASE_SYNC: Joi.bool()
});

export default Schema;