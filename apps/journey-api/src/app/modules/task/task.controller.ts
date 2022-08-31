import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  async getAllTasks(@Query('user') user_id?: string): Promise<Task[]> {
    return await this.taskService.getAllTasks(user_id);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.taskService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() data: CreateTaskDto): Promise<string> {
    return await this.taskService.createTask(data);
  }

  @Patch(':id')
  async updateTaskById(
    @Param('id') id: string,
    @Body() data: UpdateTaskDto
  ): Promise<number> {
    return await this.taskService.updateTaskById(id, data);
  }

  @Patch('')
  async updateTasks(@Body() data) {
    return await this.taskService.updateTasks(data);
  }

  @Delete(':id')
  async deleteTaskById(@Param('id') id: string): Promise<number> {
    return await this.taskService.deleteTaskById(id);
  }

  @Delete()
  async deleteAllTasksById(@Body() data) {
    return await this.taskService.deleteAllTasksById(data);
  }
}
