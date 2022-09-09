import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './user-access.constants';
import { UserAccessTokenService } from './user-access.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: process.env['NX_USER_ACCESS_TOKEN_EXPIRATION'],
      },
    }),
  ],
  providers: [UserAccessTokenService],
  exports: [UserAccessTokenService, JwtModule],
})
export class UserAccessTokenModule {}
