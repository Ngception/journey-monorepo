import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { createUser } from '@journey-monorepo/util';
import { AuthUtilService } from '../../shared/auth/auth-util.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserAccessTokenService } from '../token/user-access/user-access.service';
import { ResetPasswordToken } from '../token/reset-password/reset-password.entity';
import { ResetPasswordTokenService } from '../token/reset-password/reset-password.service';
import { EmailService } from '../email/email.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService,
    userService: UserService,
    emailService: EmailService,
    userAccessTokenService: UserAccessTokenService,
    resetPasswordTokenService: ResetPasswordTokenService;

  const user = createUser();
  const date = new Date();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        AuthUtilService,
        EmailService,
        UserAccessTokenService,
        ResetPasswordTokenService,
        JwtService,
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: Repository,
        },
        {
          provide: getRepositoryToken(ResetPasswordToken),
          useValue: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    userAccessTokenService = module.get<UserAccessTokenService>(
      UserAccessTokenService
    );
    emailService = module.get<EmailService>(EmailService);
    resetPasswordTokenService = module.get<ResetPasswordTokenService>(
      ResetPasswordTokenService
    );

    jest.useFakeTimers('modern');
    jest.setSystemTime(date);
  });

  describe('validateUser', () => {
    it('should return an access token and user info if user is successfully validated', async () => {
      const mockToken = 'token';

      jest.spyOn(userService, 'getUser').mockResolvedValue(user);
      jest
        .spyOn(userAccessTokenService, 'createToken')
        .mockImplementation(() => mockToken);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);

      const res = await authService.validateUser(user);

      expect(res).toEqual({
        access_token: mockToken,
        user_id: user.user_id,
        created_at: user.created_at,
      });
      expect(userService.getUser).toHaveBeenCalledWith({ email: user.email });
    });
  });

  describe('Reset password', () => {
    describe('Send email', () => {
      it('should send email with password reset link', async () => {
        const mockToken = new ResetPasswordToken();
        const resetToken = 'reset-token';
        const userData = {
          email: 'email',
        };
        const passwordResetLink = `reset-password?token=${resetToken}`;

        jest.spyOn(userService, 'getUser').mockResolvedValue(user);
        jest
          .spyOn(resetPasswordTokenService, 'getToken')
          .mockResolvedValue(mockToken);
        jest
          .spyOn(resetPasswordTokenService, 'saveToken')
          .mockResolvedValue('token-uuid');
        jest
          .spyOn(resetPasswordTokenService, 'createToken')
          .mockReturnValue(resetToken);
        jest
          .spyOn(authService, 'checkForExistingResetRequest')
          .mockResolvedValue(false);
        jest
          .spyOn(emailService, 'sendPasswordResetEmail')
          .mockImplementation(jest.fn());

        await authService.sendPasswordResetLink(userData);

        expect(emailService.sendPasswordResetEmail).toHaveBeenCalledWith(
          userData.email,
          passwordResetLink
        );
      });
    });

    describe('Verify', () => {
      it('should allow request if there are no existing requests', async () => {
        jest
          .spyOn(resetPasswordTokenService, 'getToken')
          .mockResolvedValue(null);

        const res = await authService.checkForExistingResetRequest('user-uuid');

        expect(res).toEqual(false);
      });

      it('should allow request if existing request is expired', async () => {
        const mockResetToken = {
          user_id: 'user-uuid',
          token_id: 'token-uuid',
          expires_at: date,
        };

        jest
          .spyOn(resetPasswordTokenService, 'getToken')
          .mockResolvedValue(mockResetToken);
        jest
          .spyOn(resetPasswordTokenService, 'deleteTokenById')
          .mockImplementation(jest.fn());

        const res = await authService.checkForExistingResetRequest('user-uuid');

        expect(res).toEqual(false);
      });

      it('should fail request if an existing request is still active', async () => {
        const mockResetToken = {
          user_id: 'user-uuid',
          token_id: 'token-uuid',
          expires_at: new Date(date.getTime() + 360000),
        };

        jest
          .spyOn(resetPasswordTokenService, 'getToken')
          .mockResolvedValue(mockResetToken);

        const res = await authService.checkForExistingResetRequest('user-uuid');

        expect(res).toEqual(true);
      });

      it('should successfully verify reset token', async () => {
        const mockJWT = {
          token_id: 'token-uuid',
          user_id: 'user-uuid',
        };
        const mockToken = {
          ...mockJWT,
          expires_at: date,
        };

        jest
          .spyOn(resetPasswordTokenService, 'verifyToken')
          .mockImplementation(jest.fn())
          .mockReturnValue(mockJWT);
        jest
          .spyOn(resetPasswordTokenService, 'getToken')
          .mockImplementation(jest.fn())
          .mockResolvedValue(mockToken);

        const res = await authService.verifyResetToken('token');

        expect(res).toEqual({
          status: 'OK',
        });
      });

      it('should fail to verify reset token', async () => {
        jest
          .spyOn(resetPasswordTokenService, 'verifyToken')
          .mockReturnValue(false);

        const res = await authService.verifyResetToken('token');

        expect(res).toEqual({
          status: 'Unauthorized',
        });
      });
    });

    describe('Reset', () => {
      const mockJWT = {
        token_id: 'token-uuid',
        user_id: 'user-uuid',
      };
      const mockResetToken = {
        ...mockJWT,
        expires_at: new Date(date.getTime() + 360000),
      };
      const userData = {
        password: 'password',
      };
      it('should reset password', async () => {
        jest
          .spyOn(resetPasswordTokenService, 'verifyToken')
          .mockReturnValue(mockJWT);
        jest
          .spyOn(resetPasswordTokenService, 'getToken')
          .mockResolvedValue(mockResetToken);
        jest.spyOn(userService, 'updateUserById').mockImplementation(jest.fn());
        jest
          .spyOn(resetPasswordTokenService, 'deleteTokenById')
          .mockImplementation(jest.fn());

        await authService.resetPassword('token', userData);

        expect(userService.updateUserById).toHaveBeenCalledWith(
          mockJWT['user_id'],
          userData
        );
        expect(resetPasswordTokenService.deleteTokenById).toHaveBeenCalledWith(
          'token-uuid'
        );
      });

      it('should fail to reset password if token is invalid', async () => {
        jest
          .spyOn(resetPasswordTokenService, 'verifyToken')
          .mockImplementation(jest.fn())
          .mockReturnValue(false);

        try {
          await authService.resetPassword('token', userData);
        } catch (error) {
          expect(error).toBeInstanceOf(UnauthorizedException);
        }
      });

      it('should fail to reset password if token is invalid', async () => {
        jest
          .spyOn(resetPasswordTokenService, 'verifyToken')
          .mockImplementation(jest.fn())
          .mockReturnValue(false);
        jest.spyOn(resetPasswordTokenService, 'getToken').mockResolvedValue({
          ...mockJWT,
          expires_at: new Date(date.getTime() - 100000),
        });
        jest.spyOn(authService, 'resetPassword');

        try {
          await authService.resetPassword('token', userData);
        } catch (error) {
          expect(error).toBeInstanceOf(UnauthorizedException);
        }
      });
    });
  });
});
