import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createTask, createTasks } from '@journey-monorepo/util';
import { Task } from './task.entity';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: Repository<Task>;

  const task = createTask();
  const tasks = createTasks();
  const date = new Date().toString();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            find: jest.fn().mockResolvedValue([task]),
            findBy: jest.fn(),
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
            deleteAllTasksById: jest.fn(),
            save: jest.fn().mockResolvedValue({
              affected: tasks.length,
            }),
          },
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));

    jest.spyOn(global, 'Date').mockReturnValue(date);
  });

  describe('GET', () => {
    it('should get all tasks', async () => {
      jest.spyOn(taskService, 'getAllTasks');
      jest.spyOn(taskRepository, 'find');

      const res = await taskService.getAllTasks();

      expect(res).toEqual([task]);
      expect(taskRepository.find).toHaveBeenCalled();
    });

    it('should get all tasks by user id', async () => {
      jest.spyOn(taskService, 'getAllTasks');
      jest.spyOn(taskRepository, 'findBy').mockResolvedValue([task]);

      const res = await taskService.getAllTasks('uuid');

      expect(res).toEqual([task]);
      expect(taskRepository.findBy).toHaveBeenCalledWith({ user_id: 'uuid' });
    });

    it('should get a single task by id', async () => {
      jest.spyOn(taskService, 'getTaskById');
      jest.spyOn(taskRepository, 'findOneBy');

      const res = await taskService.getTaskById('id');

      expect(res).toEqual(task);
      expect(taskRepository.findOneBy).toHaveBeenCalled();
    });
  });

  describe('POST', () => {
    it('should create a single task', async () => {
      jest.spyOn(taskService, 'createTask');
      jest.spyOn(taskRepository, 'create');
      jest.spyOn(taskRepository, 'insert');
      jest.spyOn(global, 'Date').mockReturnValue(date);

      const data = {
        content: 'test content',
        current_status: 'in progress' as const,
        user_id: 'uuid',
      };

      const createData = {
        ...data,
        created_at: new Date(),
      };

      const res = await taskService.createTask(data);

      expect(res).toEqual('uuid');
      expect(taskRepository.create).toHaveBeenCalledWith(createData);
      expect(taskRepository.insert).toHaveBeenCalled();
    });
  });

  describe('PATCH', () => {
    it('should update a single task by id', async () => {
      jest.spyOn(taskService, 'updateTaskById');
      jest.spyOn(taskRepository, 'update');

      const data = {
        content: 'updated content',
        current_status: 'in progress' as const,
        updated_at: new Date(),
      };

      const res = await taskService.updateTaskById('uuid', data);

      expect(res).toEqual(1);
      expect(taskRepository.update).toHaveBeenCalledWith('uuid', data);
    });

    it('should update multiple tasks', async () => {
      jest.spyOn(taskService, 'updateTasks');
      jest.spyOn(taskRepository, 'save');

      const res = await taskService.updateTasks(tasks);

      expect(res).toEqual(tasks.length);
      expect(taskRepository.save).toHaveBeenCalledWith(tasks);
    });
  });

  describe('DELETE', () => {
    it('should delete a single task by id', async () => {
      jest.spyOn(taskService, 'deleteTaskById');
      jest.spyOn(taskRepository, 'delete');

      const res = await taskService.deleteTaskById('uuid');

      expect(res).toEqual(1);
      expect(taskRepository.delete).toHaveBeenCalledWith({ task_id: 'uuid' });
    });

    it('should delete multiple tasks by id', async () => {
      const tasksIds = tasks.map((task) => task.task_id);

      jest
        .spyOn(taskService, 'deleteAllTasksById')
        .mockResolvedValue(tasksIds.length);
      jest.spyOn(taskRepository, 'delete');

      const res = await taskService.deleteAllTasksById(tasksIds);

      expect(res).toEqual(tasksIds.length);
      expect(taskRepository.delete).toHaveBeenCalled();
    });
  });
});
