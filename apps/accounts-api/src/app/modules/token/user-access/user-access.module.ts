import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './user-access.constants';
import { UserAccessTokenService } from './user-access.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  providers: [UserAccessTokenService],
  exports: [UserAccessTokenService, JwtModule],
})
export class UserAccessTokenModule {}
