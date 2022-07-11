/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from './app/app.module';
import { httpsOptions } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.enableCors();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(morgan('dev'));
  const port = process.env.PORT || 3400;
  const hostname = process.env['NX_JAPI_HOSTNAME'];
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: https://${hostname}:${port}/${globalPrefix}`
  );
}

bootstrap();
