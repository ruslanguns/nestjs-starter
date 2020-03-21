import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DB,
    uri: mongoUri(),
}));


function mongoUri(): string {
    const database_username = process.env.DATABASE_USER;
    const database_password = process.env.DATABASE_PASSWORD;
    const database_host = process.env.DATABASE_HOST;
    const database_port = process.env.DATABASE_PORT;
    const database_name = process.env.DATABASE_NAME;

    // Local Format: 'mongodb://username:password@host:port/database'
    return `mongodb://${database_username}:${database_password}@${database_host}:${database_port}/${database_name}`;
}