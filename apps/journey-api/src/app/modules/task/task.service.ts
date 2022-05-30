import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.repo.find();
  }

  async getTaskById(id: string): Promise<Task> {
    return await this.repo.findOneBy({
      task_id: id,
    });
  }
}
