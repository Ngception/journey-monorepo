import { createTask } from '@journey-monorepo/util';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: Repository<Task>;

  const task = createTask();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
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
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  describe('GET', () => {
    it('should get all tasks', async () => {
      jest.spyOn(taskService, 'getAllTasks');
      jest.spyOn(taskRepository, 'find');

      const res = await taskService.getAllTasks();

      expect(res).toEqual([task]);
      expect(taskRepository.find).toHaveBeenCalled();
    });

    it('should get a single task by id', async () => {
      jest.spyOn(taskService, 'getTaskById');
      jest.spyOn(taskRepository, 'findOneBy');

      const res = await taskService.getTaskById('id');

      expect(res).toEqual(task);
      expect(taskRepository.findOneBy).toHaveBeenCalled();
    });
  });
});
