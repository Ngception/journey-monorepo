import { Controller, Get, Param } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks(): { data: Promise<Task[]> } {
    return {
      data: this.taskService.getAllTasks(),
    };
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): { data: Promise<Task> } {
    return {
      data: this.taskService.getTaskById(id),
    };
  }
}
