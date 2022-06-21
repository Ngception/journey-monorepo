import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './modules/auth/auth.service';
import { CreateUserDto } from './modules/user/user.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Post('auth/login')
  async login(
    @Body() data: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<{
    message: string;
    user?: {
      user_id: string;
      email: string;
      created_at: Date;
    };
  } | void> {
    const { user_id, access_token, created_at } =
      await this.authService.validateUser(data);

    if (access_token) {
      response.cookie('user', access_token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        signed: true,
      });

      return {
        message: 'success',
        user: {
          user_id,
          created_at,
          email: data.email,
        },
      };
    } else {
      return {
        message: 'error',
      };
    }
  }

  @Post('auth/logout')
  logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request
  ) {
    if (request.signedCookies['user']) {
      response.clearCookie('user', {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        signed: true,
      });

      return {
        message: 'success',
      };
    } else {
      return {
        message: 'error',
      };
    }
  }

  @Get('status')
  getStatus() {
    return this.appService.getStatus();
  }
}
