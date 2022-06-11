import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthUtilModule } from '../shared/auth/auth-util.module';

export const modules = [AuthModule, AuthUtilModule, UserModule];

export * from './auth/auth.module';
export * from './user/user.module';
export * from '../shared/auth/auth-util.module';
