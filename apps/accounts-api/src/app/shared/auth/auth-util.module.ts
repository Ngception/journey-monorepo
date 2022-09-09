import { Module } from '@nestjs/common';
import { AuthUtilService } from './auth-util.service';

@Module({
  providers: [AuthUtilService],
  exports: [AuthUtilService],
})
export class AuthUtilModule {}
