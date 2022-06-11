import { Module } from '@nestjs/common';
import { AuthUtilModule } from '../../shared/auth/auth-util.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, AuthUtilModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
