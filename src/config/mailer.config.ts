import { registerAs } from '@nestjs/config';
import { HandlebarsAdapter, MailerOptions } from '@nestjs-modules/mailer';

function mailerModuleOptions(): MailerOptions {
  return {
    transport: {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      //   tls: {
      //     ciphers: 'SSLv3'
      //   },
      secure: process.env.EMAIL_SECURE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
    defaults: {
      from: `"${process.env.EMAIL_DEFAULT_FROM_NAME}" <${process.env.EMAIL_DEFAULT_FROM_EMAIL}>`,
    },
    template: {
      dir: process.cwd() + '/template/',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  };
}

export default registerAs('mailer', () => ({
  config: mailerModuleOptions(),
}));
