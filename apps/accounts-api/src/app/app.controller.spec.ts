import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './modules/auth/guards';
import { User } from './modules/user/user.entity';
import { UserService } from './modules/user/user.service';
import { AuthUtilModule } from './shared/auth/auth-util.module';

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;

  const responseObject = {
    status: 201,
    message: 'success',
  };

  const date = new Date();

  const mockResponse: Partial<Response> = {
    status: jest.fn().mockImplementation().mockReturnValue(201),
    json: jest.fn().mockImplementation().mockReturnValue(responseObject),
    cookie: jest.fn().mockImplementation().mockReturnValue('cookie'),
    clearCookie: jest.fn(),
  };

  const mockRequest: Partial<Request> = {
    body: jest.fn().mockImplementation().mockReturnValue({}),
    signedCookies: {
      user: {},
    },
    user: {
      access_token: 'token',
      user_id: 'uuid',
      email: 'email',
      created_at: date,
    },
  };

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [AuthUtilModule],
      controllers: [AppController],
      providers: [
        AppService,
        UserService,
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: Repository,
        },
      ],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('login', () => {
    it('should login user', async () => {
      const testUser = {
        email: 'email',
        password: 'password',
      };

      const mockUserInfo = {
        user_id: 'uuid',
        email: testUser.email,
        created_at: date,
      };

      const res = await appController.login(
        testUser,
        mockResponse as Response,
        mockRequest as Request
      );

      expect(res).toEqual({ message: 'success', user: mockUserInfo });
      expect(mockResponse.cookie).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should logout user', async () => {
      const res = await appController.logout(
        mockResponse as Response,
        mockRequest as Request
      );

      expect(res).toEqual({ message: 'success' });
      expect(mockResponse.clearCookie).toHaveBeenCalled();
    });
  });

  describe('getAuthStatus', () => {
    it('should return auth status', () => {
      expect(appController.getAuthStatus(mockRequest)).toEqual({
        message: 'OK',
        user: {
          user_id: 'uuid',
          email: 'email',
          created_at: date,
        },
      });
    });
  });

  describe('getStatus', () => {
    it('should return status', () => {
      expect(appController.getStatus()).toEqual({
        message: 'OK',
      });
    });
  });
});
