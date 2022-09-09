import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginUserDto, RequestUserPasswordResetDto } from '../user/user.dto';
import { EmailService } from '../email/email.service';
import { ResetPasswordTokenService } from '../token/reset-password/reset-password.service';
import { UserAccessTokenService } from '../token/user-access/user-access.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private emailService: EmailService,
    private userAccessTokenService: UserAccessTokenService,
    private resetPasswordTokenService: ResetPasswordTokenService
  ) {}

  async validateUser(
    data: LoginUserDto
  ): Promise<{ user_id: string; access_token: string; created_at: Date }> {
    const user = await this.userService.getUser({
      email: data.email,
    });

    if (user) {
      const isMatch = await bcrypt.compare(data.password, user.password);

      if (isMatch) {
        const { user_id, created_at } = user;
        const access_token = await this.userAccessTokenService.createToken({
          user_id: user.user_id,
          email: user.email,
        });

        return {
          user_id,
          access_token,
          created_at,
        };
      }
    }
  }

  async sendPasswordResetLink(data: RequestUserPasswordResetDto) {
    try {
      const user = await this.userService.getUser({
        email: data.email,
      });

      if (!user) {
        return {
          status: 'Unauthorized',
        };
      }

      const resetTokenExists = await this.checkForExistingResetRequest(
        user.user_id
      );

      if (resetTokenExists) {
        return {
          status: 'Conflict',
        };
      }

      const currentDate = new Date();

      const tokenId = await this.resetPasswordTokenService.saveToken({
        user_id: user.user_id,
        expires_at: new Date(
          currentDate.getTime() +
            parseInt(process.env['NX_RESET_PASSWORD_LINK_EXPIRATION'])
        ),
      });

      const resetToken = this.resetPasswordTokenService.createToken({
        token_id: tokenId,
        user_id: user.user_id,
      });

      const passwordResetLink = `reset-password?token=${resetToken}`;

      this.emailService.sendPasswordResetEmail(data.email, passwordResetLink);

      return {
        status: 'OK',
      };
    } catch (err) {
      return {
        status: 'Failed',
      };
    }
  }

  async checkForExistingResetRequest(userId: string): Promise<boolean> {
    const resetToken = await this.resetPasswordTokenService.getToken({
      user_id: userId,
    });

    if (!resetToken) {
      return false;
    }

    if (resetToken?.expires_at > new Date()) {
      return true;
    }

    await this.resetPasswordTokenService.deleteTokenById(resetToken.token_id);
    return false;
  }

  async resetPassword(
    token: string,
    userData: { password: string }
  ): Promise<{ status: string }> {
    const tokenData = this.resetPasswordTokenService.verifyToken(token);

    if (!tokenData) {
      return {
        status: 'Unauthorized',
      };
    }

    try {
      const savedToken = await this.resetPasswordTokenService.getToken({
        token_id: tokenData['token_id'],
      });

      if (savedToken['expires_at'] < new Date()) {
        return {
          status: 'Unauthorized',
        };
      }

      await this.userService.updateUserById(tokenData['user_id'], userData);

      await this.resetPasswordTokenService.deleteTokenById(
        tokenData['token_id']
      );

      return {
        status: 'OK',
      };
    } catch (err) {
      return {
        status: 'Failed',
      };
    }
  }

  async verifyResetToken(token: string): Promise<{ status: string }> {
    const tokenData = this.resetPasswordTokenService.verifyToken(token);

    if (!tokenData) {
      return {
        status: 'Unauthorized',
      };
    }

    try {
      const existingToken = await this.resetPasswordTokenService.getToken({
        token_id: tokenData.token_id,
      });

      if (!existingToken || existingToken.expires_at < new Date()) {
        return {
          status: 'Unauthorized',
        };
      }

      return {
        status: 'OK',
      };
    } catch (err) {
      return {
        status: 'Failed',
      };
    }
  }

  getAuthStatus(): { message: string } {
    return { message: 'OK' };
  }
}
