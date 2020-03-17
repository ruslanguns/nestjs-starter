import * as Joi from '@hapi/joi';

const Schema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production')
        .default('development'),
    PORT: Joi.number().default(3000)
});

export default Schema;