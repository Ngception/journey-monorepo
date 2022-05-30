import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as fromModules from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env/journey-db.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ...fromModules.modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
