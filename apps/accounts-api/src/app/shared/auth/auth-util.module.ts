import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthUtilService } from './auth-util.service';
import { jwtConstants } from './auth-util.constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthUtilService],
  exports: [AuthUtilService],
})
export class AuthUtilModule {}
