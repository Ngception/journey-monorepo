import { Request, Response } from 'express';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request as NestJSRequest,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './modules/user/user.dto';
import { AppService } from './app.service';
import { JwtAuthGuard, LocalAuthGuard } from './modules/auth/guards';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() data: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
    @NestJSRequest() request
  ) {
    const { user_id, access_token, created_at } = request.user;

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

  @UseGuards(JwtAuthGuard)
  @Get('status')
  getStatus() {
    return this.appService.getStatus();
  }
}
