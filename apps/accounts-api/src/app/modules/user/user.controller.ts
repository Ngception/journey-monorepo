import { Controller, Get, Param } from '@nestjs/common';
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
}
