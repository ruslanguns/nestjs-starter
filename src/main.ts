import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as compression from 'compression';

// Security
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);

  // Environments
  const port = configService.get<number>('PORT');
  const environment = configService.get<string>('NODE_ENV');

  // Security setup
  app.use(helmet());
  app.enableCors();
  // app.use(csurf());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  // compression
  app.use(compression());

  await app.listen(port);
  logger.log(`Application is running in ${environment.toUpperCase()} on: ${await app.getUrl()}`);
}
bootstrap();
