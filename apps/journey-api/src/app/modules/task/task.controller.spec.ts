/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTask, createTasks } from '@journey-monorepo/util';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskService } from './task.service';

describe('TaskController', () => {
  let taskService: TaskService;
  let taskController: TaskController;

  const task = createTask();
  const tasks = createTasks();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            find: jest.fn().mockResolvedValue([task]),
            findOneBy: jest.fn().mockResolvedValue(task),
            create: jest.fn().mockResolvedValue(task),
            insert: jest
              .fn()
              .mockResolvedValue({ identifiers: [{ task_id: 'uuid' }] }),
            update: jest.fn().mockResolvedValue({
              affected: 1,
            }),
            delete: jest.fn().mockResolvedValue({
              affected: 1,
            }),
            getAllTasks: jest.fn(),
            getTaskById: jest.fn(),
            createTask: jest.fn(),
            updateTaskById: jest.fn(),
            deleteTaskbyId: jest.fn(),
            save: jest.fn().mockResolvedValue({
              affected: tasks.length,
            }),
          },
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskController = module.get<TaskController>(TaskController);
  });

  describe('GET', () => {
    it('should get all tasks', async () => {
      jest.spyOn(taskService, 'getAllTasks');

      const res = await taskController.getAllTasks();

      expect(taskService.getAllTasks).toHaveBeenCalled();
      expect(res).toEqual([task]);
    });

    it('should get a single task by id', async () => {
      jest.spyOn(taskService, 'getTaskById');

      const res = await taskController.getTaskById('id');

      expect(taskService.getTaskById).toHaveBeenCalledWith('id');
      expect(res).toEqual(task);
    });
  });

  describe('POST', () => {
    it('should create a single task', async () => {
      jest.spyOn(taskService, 'createTask');

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
      jest.spyOn(taskService, 'updateTaskById');

      const data = {
        content: 'updated content',
        current_status: 'in progress' as const,
      };

      const res = await taskController.updateTaskById('uuid', data);

      expect(taskService.updateTaskById).toHaveBeenCalledWith('uuid', data);
      expect(res).toEqual(1);
    });

    it('should update multiple tasks', async () => {
      jest.spyOn(taskService, 'updateTasks');

      const res = await taskController.updateTasks(tasks);

      expect(taskService.updateTasks).toHaveBeenCalledWith(tasks);
      expect(res).toEqual(tasks.length);
    });
  });

  describe('DELETE', () => {
    it('should delete a single task by id', async () => {
      jest.spyOn(taskService, 'deleteTaskById');

      const res = await taskController.deleteTaskById('uuid');

      expect(taskService.deleteTaskById).toHaveBeenCalledWith('uuid');
      expect(res).toEqual(1);
    });
  });
});
