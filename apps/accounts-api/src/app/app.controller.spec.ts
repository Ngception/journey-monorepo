import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { User } from './modules/user/user.entity';
import { UserService } from './modules/user/user.service';
import { AuthUtilModule } from './shared/auth/auth-util.module';

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;
  let authService: AuthService;

  const responseObject = {
    status: 201,
    message: 'success',
  };

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
  };

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [AuthUtilModule],
      controllers: [AppController],
      providers: [
        AppService,
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: Repository,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    authService = app.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should login user', async () => {
      const testUser = {
        email: 'email',
        password: 'password',
      };

      const mockToken = {
        access_token: 'token',
      };

      const mockUserInfo = {
        user_id: 'uuid',
        email: testUser.email,
        created_at: new Date(),
      };

      jest.spyOn(authService, 'validateUser').mockResolvedValue({
        ...mockToken,
        ...mockUserInfo,
      });

      const res = await appController.login(testUser, mockResponse as Response);

      expect(res).toEqual({ message: 'success', user: mockUserInfo });
      expect(authService.validateUser).toHaveBeenCalledWith(testUser);
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

  describe('getStatus', () => {
    it('should return status', () => {
      expect(appController.getStatus()).toEqual({
        message: 'OK',
      });
    });
  });
});
