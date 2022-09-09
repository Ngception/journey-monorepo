import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from './reset-password.constants';
import { ResetPasswordToken } from './reset-password.entity';
import { ResetPasswordTokenService } from './reset-password.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResetPasswordToken]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: process.env['NX_RESET_PASSWORD_TOKEN_EXPIRATION'],
      },
    }),
  ],
  providers: [ResetPasswordTokenService],
  exports: [ResetPasswordTokenService, JwtModule],
})
export class ResetPasswordTokenModule {}
