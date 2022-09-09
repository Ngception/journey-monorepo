import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, AuthUtilModule, EmailModule } from './modules';
import { TokenModule } from './modules/token/token.module';
import { ControllerUtilModule } from './shared/controller/controller.util.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env/accounts-db.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthUtilModule,
    ControllerUtilModule,
    AuthModule,
    EmailModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
