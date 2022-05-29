import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to journey-api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to journey-api!' });
    });
  });

  describe('getStatus', () => {
    it('should return status', () => {
      expect(service.getStatus()).toEqual({ message: 'OK' });
    });
  });
});
