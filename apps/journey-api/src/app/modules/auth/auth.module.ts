import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';

const JWT_CONSTANTS = {
  secret: process.env['NX_JWT_SECRET_KEY'],
};

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_CONSTANTS.secret,
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
