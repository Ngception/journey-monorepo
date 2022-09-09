import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return await this.userService.getUserById(id);
  }

  @Post()
  async createUser(
    @Body() data: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<{
    message: string;
    user?: {
      email: string;
      user_id: string;
      created_at: Date;
    };
  }> {
    const { user_id, access_token, created_at } =
      await this.userService.createUser(data);

    if (access_token) {
      const currentDate = new Date();

      response.cookie('user', access_token, {
        domain: process.env['NX_COOKIE_DOMAIN'],
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        signed: true,
        expires: new Date(
          currentDate.getTime() + parseInt(process.env['NX_COOKIE_EXPIRATION'])
        ),
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() data: UpdateUserDto
  ): Promise<number> {
    return await this.userService.updateUserById(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<number> {
    return await this.userService.deleteUserById(id);
  }
}
