import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies';

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
