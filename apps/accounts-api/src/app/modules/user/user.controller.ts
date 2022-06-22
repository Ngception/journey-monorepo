import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

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

  @Patch(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() data: UpdateUserDto
  ): Promise<{ message: string }> {
    const userUpdated = await this.userService.updateUserById(id, data);

    if (userUpdated) {
      return {
        message: 'success',
      };
    } else {
      return {
        message: 'error',
      };
    }
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<{ message: string }> {
    const userDeleted = await this.userService.deleteUserById(id);

    if (userDeleted) {
      return {
        message: 'success',
      };
    } else {
      return {
        message: 'error',
      };
    }
  }
}
