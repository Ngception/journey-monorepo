import { Module } from '@nestjs/common';
import { TokenModule } from '../token/token.module';
import { EmailModule } from '../email/email.module';
import { UserModule } from '../user/user.module';
import { JwtStrategy, LocalStrategy } from './strategies';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, EmailModule, TokenModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
