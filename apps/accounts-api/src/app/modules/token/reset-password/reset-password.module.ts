import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from './reset-password.constants';
import { ResetPasswordToken } from './reset-password.entity';
import { ResetPasswordTokenService } from './reset-password.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ResetPasswordToken]),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  providers: [ResetPasswordTokenService],
  exports: [ResetPasswordTokenService, JwtModule],
})
export class ResetPasswordTokenModule {}
