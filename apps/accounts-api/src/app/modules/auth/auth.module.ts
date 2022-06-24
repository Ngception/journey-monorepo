import { Module } from '@nestjs/common';
import { AuthUtilModule } from '../../shared/auth/auth-util.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies';

@Module({
  imports: [UserModule, AuthUtilModule],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
