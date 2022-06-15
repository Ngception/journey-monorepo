import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
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
  ): Promise<{ message: string } | void> {
    const token = await this.authService.validateUser(data);

    response.cookie('user', token, {
      httpOnly: false,
      sameSite: 'none',
      secure: true,
      signed: true,
    });

    return {
      message: 'Success',
    };
  }

  @Post('auth/logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('user', {
      httpOnly: false,
      sameSite: 'none',
      secure: true,
    });

    return {
      message: 'Success',
    };
  }

  @Get('status')
  getStatus() {
    return this.appService.getStatus();
  }
}
