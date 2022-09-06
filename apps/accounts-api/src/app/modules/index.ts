import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { UserModule } from './user/user.module';
import { AuthUtilModule } from '../shared/auth/auth-util.module';

export const modules = [AuthModule, AuthUtilModule, EmailModule, UserModule];

export * from './auth/auth.module';
export * from './email/email.module';
export * from './user/user.module';
export * from '../shared/auth/auth-util.module';
