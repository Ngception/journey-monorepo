/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTask } from '@journey-monorepo/util';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskService } from './task.service';

describe('TaskController', () => {
  let taskService: TaskService;
  let taskController: TaskController;

  const task = createTask();

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
            getAllTasks: jest.fn(),
            getTaskById: jest.fn(),
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
      expect(res).toEqual({
        data: [task],
      });
    });

    it('should get a single task by id', async () => {
      jest.spyOn(taskService, 'getTaskById');

      const res = await taskController.getTaskById('id');

      expect(taskService.getTaskById).toHaveBeenCalledWith('id');
      expect(res).toEqual({
        data: task,
      });
    });
  });
});
