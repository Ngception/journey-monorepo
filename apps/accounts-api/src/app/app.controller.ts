import { Body, Controller, Get, Post } from '@nestjs/common';
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
  login(@Body() data: CreateUserDto): Promise<{ access_token: string } | void> {
    return this.authService.validateUser(data);
  }

  @Get('status')
  getStatus() {
    return this.appService.getStatus();
  }
}
