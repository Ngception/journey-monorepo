import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  async getAllTasks(
    @Query('user') user_id?: string
  ): Promise<{ data: Task[] }> {
    return {
      data: await this.taskService.getAllTasks(user_id),
    };
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<{ data: Task }> {
    return {
      data: await this.taskService.getTaskById(id),
    };
  }

  @Post()
  async createTask(@Body() data: CreateTaskDto): Promise<{ data: string }> {
    return {
      data: await this.taskService.createTask(data),
    };
  }

  @Patch(':id')
  async updateTaskById(
    @Param('id') id: string,
    @Body() data: UpdateTaskDto
  ): Promise<{ data: number }> {
    return {
      data: await this.taskService.updateTaskById(id, data),
    };
  }

  @Delete(':id')
  async deleteTaskById(@Param('id') id: string): Promise<{ data: number }> {
    return {
      data: await this.taskService.deleteTaskById(id),
    };
  }
}
