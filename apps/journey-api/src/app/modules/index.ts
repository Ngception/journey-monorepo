import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';

export const modules = [AuthModule, TaskModule];

export * from './auth/auth.module';
export * from './task/task.module';
