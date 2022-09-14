import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUtilModule } from '../../shared/auth/auth-util.module';
import { EmailModule } from '../email/email.module';
import { UserAccessTokenModule } from '../token/user-access/user-access.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule,
    AuthUtilModule,
    EmailModule,
    UserAccessTokenModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
