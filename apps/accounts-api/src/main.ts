/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { AppModule } from './app/app.module';
import { corsConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors(corsConfig);
  app.use(cookieParser(process.env['NX_COOKIE_SECRET']));
  app.use(morgan('dev'));
  const port = process.env.PORT || 3300;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
