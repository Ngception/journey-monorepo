/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createTask, createTasks } from '@journey-monorepo/util';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { Repository } from 'typeorm';

describe('TaskController', () => {
  let taskService: TaskService, taskController: TaskController;

  const task = createTask(),
    tasks = createTasks();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: Repository,
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskController = module.get<TaskController>(TaskController);
  });

  describe('GET', () => {
    it('should get all tasks', async () => {
      jest
        .spyOn(taskService, 'getAllTasks')
        .mockImplementation(jest.fn())
        .mockResolvedValue(tasks);

      const res = await taskController.getAllTasks();

      expect(taskService.getAllTasks).toHaveBeenCalled();
      expect(res).toEqual(tasks);
    });

    it('should get a single task by id', async () => {
      jest
        .spyOn(taskService, 'getTaskById')
        .mockImplementation(jest.fn())
        .mockResolvedValue(task);

      const res = await taskController.getTaskById('id');

      expect(taskService.getTaskById).toHaveBeenCalledWith('id');
      expect(res).toEqual(task);
    });
  });

  describe('POST', () => {
    it('should create a single task', async () => {
      jest
        .spyOn(taskService, 'createTask')
        .mockImplementation(jest.fn())
        .mockResolvedValue('uuid');

      const data = {
        content: 'test content',
        current_status: 'done' as const,
        user_id: 'uuid',
      };

      const res = await taskController.createTask(data);

      expect(taskService.createTask).toHaveBeenCalledWith(data);
      expect(res).toEqual('uuid');
    });
  });

  describe('PATCH', () => {
    it('should update a single task by id', async () => {
      jest
        .spyOn(taskService, 'updateTaskById')
        .mockImplementation(jest.fn())
        .mockResolvedValue(1);

      const data = {
        content: 'updated content',
        current_status: 'in progress' as const,
      };

      const res = await taskController.updateTaskById('uuid', data);

      expect(taskService.updateTaskById).toHaveBeenCalledWith('uuid', data);
      expect(res).toEqual(1);
    });

    it('should update multiple tasks', async () => {
      jest
        .spyOn(taskService, 'updateTasks')
        .mockImplementation(jest.fn())
        .mockResolvedValue(tasks.length);

      const res = await taskController.updateTasks(tasks);

      expect(taskService.updateTasks).toHaveBeenCalledWith(tasks);
      expect(res).toEqual(tasks.length);
    });
  });

  describe('DELETE', () => {
    it('should delete a single task by id', async () => {
      jest
        .spyOn(taskService, 'deleteTaskById')
        .mockImplementation(jest.fn())
        .mockResolvedValue(1);

      const res = await taskController.deleteTaskById('uuid');

      expect(taskService.deleteTaskById).toHaveBeenCalledWith('uuid');
      expect(res).toEqual(1);
    });

    it('should delete multiple tasks by id', async () => {
      const tasksIds = tasks.map((task) => task.task_id);

      jest
        .spyOn(taskService, 'deleteAllTasksById')
        .mockImplementation(jest.fn())
        .mockResolvedValue(tasksIds.length);

      const res = await taskController.deleteAllTasksById(tasksIds);

      expect(taskService.deleteAllTasksById).toHaveBeenCalledWith(tasksIds);
      expect(res).toEqual(tasksIds.length);
    });
  });
});
