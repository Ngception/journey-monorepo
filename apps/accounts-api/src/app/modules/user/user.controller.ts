import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<{ data: User[] }> {
    return {
      data: await this.userService.getAllUsers(),
    };
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<{ data: User }> {
    return {
      data: await this.userService.getUserById(id),
    };
  }

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<{ data: string }> {
    return {
      data: await this.userService.createUser(data),
    };
  }

  @Patch(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() data: UpdateUserDto
  ): Promise<{ data: number }> {
    return {
      data: await this.userService.updateUserById(id, data),
    };
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<{ data: number }> {
    return {
      data: await this.userService.deleteUserById(id),
    };
  }
}
