import { Controller, Get, Param } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<{ data: Task[] }> {
    return {
      data: await this.taskService.getAllTasks(),
    };
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<{ data: Task }> {
    return {
      data: await this.taskService.getTaskById(id),
    };
  }
}
