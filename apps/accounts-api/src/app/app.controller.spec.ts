import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthUtilService } from './shared/auth/auth-util.service';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './modules/auth/guards';
import { EmailService } from './modules/email/email.service';
import { User } from './modules/user/user.entity';
import { UserService } from './modules/user/user.service';
import { ResetPasswordToken } from './modules/token/reset-password/reset-password.entity';
import { UserAccessTokenService } from './modules/token/user-access/user-access.service';
import { ResetPasswordTokenService } from './modules/token/reset-password/reset-password.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerUtilService } from './shared/controller/controller.util.service';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
  let app: TestingModule,
    appController: AppController,
    authService: AuthService;

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
      imports: [ConfigModule],
      controllers: [AppController],
      providers: [
        AppService,
        UserService,
        AuthService,
        EmailService,
        AuthUtilService,
        UserAccessTokenService,
        ResetPasswordTokenService,
        JwtService,
        ControllerUtilService,
        {
          provide: getRepositoryToken(User),
          useValue: Repository,
        },
        {
          provide: getRepositoryToken(ResetPasswordToken),
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
    authService = app.get<AuthService>(AuthService);
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

  describe('reset', () => {
    it('should request password reset', async () => {
      const mockData = {
          email: 'hello@email.com',
        },
        mockStatus = {
          status: 'OK',
        };

      jest
        .spyOn(authService, 'sendPasswordResetLink')
        .mockImplementation(jest.fn())
        .mockResolvedValue(mockStatus);

      const res = await appController.requestPasswordReset(mockData);

      expect(res).toEqual(mockStatus);
      expect(authService.sendPasswordResetLink).toHaveBeenCalledWith(mockData);
    });

    it('should verify reset token', async () => {
      const mockToken = 'JWT',
        mockStatus = {
          status: 'OK',
        };

      jest
        .spyOn(authService, 'verifyResetToken')
        .mockImplementation(jest.fn())
        .mockResolvedValue(mockStatus);

      const res = await appController.verifyResetToken(mockToken);

      expect(res).toEqual(mockStatus);
      expect(authService.verifyResetToken).toHaveBeenCalledWith(mockToken);
    });

    it('should reset password', async () => {
      const mockToken = 'JWT',
        mockData = {
          password: 'password',
        },
        mockStatus = {
          status: 'OK',
        };

      jest
        .spyOn(authService, 'resetPassword')
        .mockImplementation(jest.fn())
        .mockResolvedValue(mockStatus);

      const res = await authService.resetPassword(mockToken, mockData);

      expect(res).toEqual(mockStatus);
      expect(authService.resetPassword).toHaveBeenCalledWith(
        mockToken,
        mockData
      );
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
