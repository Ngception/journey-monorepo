import { createTask } from '@journey-monorepo/util';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: Repository<Task>;
  let setSpies: (serviceMethod, repoMethod) => void;

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
          },
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));

    setSpies = (serviceMethod, repoMethod) => {
      jest.spyOn(taskService, serviceMethod);
      jest.spyOn(taskRepository, repoMethod);
    };
  });

  describe('GET', () => {
    it('should get all tasks', async () => {
      setSpies('getAllTasks', 'find');

      const res = await taskService.getAllTasks();

      expect(res).toEqual([task]);
      expect(taskRepository.find).toHaveBeenCalled();
    });

    it('should get a single task by id', async () => {
      setSpies('getTaskById', 'findOneBy');

      const res = await taskService.getTaskById('id');

      expect(res).toEqual(task);
      expect(taskRepository.findOneBy).toHaveBeenCalled();
    });
  });

  describe('POST', () => {
    it('should create a single task', async () => {
      setSpies('createTask', 'create');
      jest.spyOn(taskRepository, 'insert');

      const data = {
        content: 'test content',
        current_status: 'in progress' as const,
        user_id: 'uuid',
      };

      const createData = {
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const res = await taskService.createTask(data);

      expect(res).toEqual('uuid');
      expect(taskRepository.create).toHaveBeenCalledWith(createData);
      expect(taskRepository.insert).toHaveBeenCalled();
    });
  });

  describe('PATCH', () => {
    it('should update a single task by id', async () => {
      setSpies('updateTaskById', 'update');

      const data = {
        content: 'updated content',
        current_status: 'in progress' as const,
        updated_at: new Date(),
      };

      const res = await taskService.updateTaskById('uuid', data);

      expect(res).toEqual(1);
      expect(taskRepository.update).toHaveBeenCalledWith('uuid', data);
    });
  });

  describe('DELETE', () => {
    it('should delete a single task by id', async () => {
      setSpies('deleteTaskById', 'delete');

      const res = await taskService.deleteTaskById('uuid');

      expect(res).toEqual(1);
      expect(taskRepository.delete).toHaveBeenCalledWith({ task_id: 'uuid' });
    });
  });
});
