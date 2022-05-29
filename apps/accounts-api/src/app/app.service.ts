import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to accounts-api!' };
  }

  getStatus(): { message: string } {
    return { message: 'OK' };
  }
}
