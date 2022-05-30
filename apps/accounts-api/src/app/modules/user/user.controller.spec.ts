/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createUser } from '@journey-monorepo/util';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('TaskController', () => {
  let userService: UserService;
  let userController: UserController;

  const user = createUser();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue([user]),
            findOneBy: jest.fn().mockResolvedValue(user),
            getAllTasks: jest.fn(),
            getTaskById: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  describe('GET', () => {
    it('should get all users', async () => {
      jest.spyOn(userService, 'getAllUsers');

      const res = await userController.getAllUsers();

      expect(userService.getAllUsers).toHaveBeenCalled();
      expect(res).toEqual({
        data: [user],
      });
    });

    it('should get a single user by id', async () => {
      jest.spyOn(userService, 'getUserById');

      const res = await userController.getUserById('id');

      expect(userService.getUserById).toHaveBeenCalledWith('id');
      expect(res).toEqual({
        data: user,
      });
    });
  });
});
