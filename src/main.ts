import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';

import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { CONFIG_SERVER_PORT, NODE_ENV } from './config/config.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);

  // Environments
  const port = configService.get<number>(CONFIG_SERVER_PORT);
  const environment = configService.get<string>(NODE_ENV);

  // Interceptors and validators
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
      transform: true,
    }),
  );

  // Security setup
  app.use(helmet());
  app.enableCors();
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
