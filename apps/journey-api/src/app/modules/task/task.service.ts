import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  throwError(error) {
    throw new HttpException(
      {
        status: HttpStatus.EXPECTATION_FAILED,
        error: error,
      },
      HttpStatus.EXPECTATION_FAILED
    );
  }

  async getAllTasks(user_id?: string): Promise<Task[]> {
    try {
      if (user_id) {
        return await this.repo.findBy({
          user_id,
        });
      } else {
        return await this.repo.find();
      }
    } catch (err) {
      this.throwError(err);
      return;
    }
  }

  async getTaskById(id: string): Promise<Task> {
    try {
      return await this.repo.findOneBy({
        task_id: id,
      });
    } catch (err) {
      this.throwError(err);
      return;
    }
  }

  async createTask(data: CreateTaskDto): Promise<string> {
    try {
      const newTask = this.repo.create({
        ...data,
        created_at: new Date(),
      });
      const { identifiers } = await this.repo.insert(newTask);

      return identifiers[0].task_id;
    } catch (err) {
      this.throwError(err);
      return;
    }
  }

  async updateTaskById(id: string, data: UpdateTaskDto): Promise<number> {
    try {
      const { affected } = await this.repo.update(id, {
        ...data,
      });

      return affected;
    } catch (err) {
      this.throwError(err);
      return;
    }
  }

  async updateTasks(tasks) {
    try {
      const { affected } = await this.repo.save(tasks);

      return affected;
    } catch (err) {
      this.throwError(err);
      return;
    }
  }

  async deleteTaskById(id: string): Promise<number> {
    try {
      const { affected } = await this.repo.delete({ task_id: id });

      return affected;
    } catch (err) {
      this.throwError(err);
      return;
    }
  }
}
