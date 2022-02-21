import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as compression from 'compression';

import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { CONFIG_SERVER_PORT, NODE_ENV } from './config/config.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);

  // Swagger
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest Starter Boilerplate')
    .setDescription('Nest collection of tools and authentication ready to use.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

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
