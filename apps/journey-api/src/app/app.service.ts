import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to journey-api!' };
  }

  getStatus(): { message: string } {
    return { message: 'OK' };
  }
}
