import { Module } from '@nestjs/common';
import { ResetPasswordTokenModule } from './reset-password/reset-password.module';
import { UserAccessTokenModule } from './user-access/user-access.module';

@Module({
  imports: [UserAccessTokenModule, ResetPasswordTokenModule],
  exports: [UserAccessTokenModule, ResetPasswordTokenModule],
})
export class TokenModule {}
