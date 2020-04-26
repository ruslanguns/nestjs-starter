// SERVER NAMESPACE
export const NODE_ENV = 'NODE_ENV';
export const CONFIG_SERVER_PORT = 'server.port';
export const CONFIG_SERVER_JWT = 'server.jwt';
export const CONFIG_SERVER_JWT_SECRET = 'server.jwt.secret';
export const CONFIG_SERVER_PASSPORT = 'server.passport';
// DATABASE NAMESPACE
export const CONFIG_DB_CONFIG = 'database.config';
// MAILER NAMESPACE
export const CONFIG_MAILER_CONFIG = 'mailer.config';
// REGEX PATTERNS
export const PATTERN_VALID_USERNAME = /^(?![_.0-9])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
export const PATTERN_VALID_EMAIL = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
