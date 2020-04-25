import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { IAuthModuleOptions } from '@nestjs/passport';

function jwtModuleOptions(): JwtModuleOptions {
  return {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRATION },
  };
}

function passportModuleOptions(): IAuthModuleOptions {
  return {
    defaultStrategy: 'jwt',
  };
}
export default registerAs('server', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: jwtModuleOptions(),
  passport: passportModuleOptions(),
}));
