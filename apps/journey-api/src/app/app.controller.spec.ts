import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to journey-api!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to journey-api!',
      });
    });
  });

  describe('getStatus', () => {
    it('should return status', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getStatus()).toEqual({
        message: 'OK',
      });
    });
  });
});
