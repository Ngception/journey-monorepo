import { Request, Response } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request as NestJSRequest,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserDto,
  RequestUserPasswordResetDto,
  UpdateUserDto,
} from './modules/user/user.dto';
import { JwtAuthGuard, LocalAuthGuard } from './modules/auth/guards';
import { AuthService } from './modules/auth/auth.service';
import { AppService } from './app.service';
import { ControllerUtilService } from './shared/controller/controller.util.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly controllerUtilService: ControllerUtilService,
    private readonly configService: ConfigService
  ) {}

  @Get('status')
  getStatus() {
    return this.appService.getStatus();
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/status')
  getAuthStatus(@NestJSRequest() request) {
    const { user_id, email, created_at } = request.user;

    return {
      ...this.authService.getAuthStatus(),
      user: {
        user_id,
        email,
        created_at,
      },
    };
  }

  @Post('auth/logout')
  logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request
  ) {
    if (request.signedCookies['user']) {
      response.clearCookie('user', {
        domain: this.configService.get('NX_COOKIE_DOMAIN'),
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        signed: true,
      });
    }

    return {
      message: 'success',
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() data: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
    @NestJSRequest() request
  ) {
    const { user_id, access_token, created_at } = request.user;

    if (access_token) {
      const currentDate = new Date();
      const expiration =
        parseInt(this.configService.get('NX_COOKIE_EXPIRATION')) || 300000;

      response.cookie('user', access_token, {
        domain: this.configService.get('NX_COOKIE_DOMAIN'),
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        signed: true,
        expires: new Date(currentDate.getTime() + expiration),
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

  @Post('auth/login/password/reset')
  async requestPasswordReset(@Body() data: RequestUserPasswordResetDto) {
    if (!data.email) {
      throw new BadRequestException();
    }

    const res = await this.authService.sendPasswordResetLink(data);

    if (res.status === 'OK') {
      return res;
    } else {
      this.controllerUtilService.handleStatus(res.status);
    }
  }

  @Post('auth/login/password/reset/:id')
  async resetPassword(@Param('id') token: string, @Body() data: UpdateUserDto) {
    const res = await this.authService.resetPassword(token, data);

    if (res.status === 'OK') {
      return res;
    } else {
      this.controllerUtilService.handleStatus(res.status);
    }
  }

  @Get('auth/login/password/reset/:id')
  async verifyResetToken(@Param('id') token: string) {
    const res = await this.authService.verifyResetToken(token);

    if (res.status === 'OK') {
      return res;
    } else {
      this.controllerUtilService.handleStatus(res.status);
    }
  }
}
