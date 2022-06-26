/* eslint-disable @typescript-eslint/no-explicit-any */
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createUser } from '@journey-monorepo/util';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthUtilModule } from '../../shared/auth/auth-util.module';
import { AuthUtilService } from '../../shared/auth/auth-util.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards';

describe('UserController', () => {
  let userService: UserService;
  let userController: UserController;
  let userRepository: Repository<User>;
  let authUtilService: AuthUtilService;

  const user = createUser();
  const date = new Date();

  const responseObject = {
    status: 201,
    message: 'success',
  };

  const mockResponse: Partial<Response> = {
    status: jest.fn().mockImplementation().mockReturnValue(201),
    json: jest.fn().mockImplementation().mockReturnValue(responseObject),
    cookie: jest.fn().mockImplementation().mockReturnValue('cookie'),
    clearCookie: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthUtilModule],
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue([user]),
            findOneBy: jest.fn(),
            create: jest.fn().mockResolvedValue(user),
            insert: jest
              .fn()
              .mockResolvedValue({ identifiers: [{ user_id: 'uuid' }] }),
            update: jest.fn().mockResolvedValue({
              affected: 1,
            }),
            delete: jest.fn().mockResolvedValue({
              affected: 1,
            }),
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            createUser: jest.fn(),
            updateUserById: jest.fn(),
            deleteUserById: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    authUtilService = module.get<AuthUtilService>(AuthUtilService);
    jest
      .spyOn(global, 'Date')
      .mockImplementation(() => date as unknown as string);
  });

  describe('GET', () => {
    it('should get all users', async () => {
      jest.spyOn(userService, 'getAllUsers');

      const res = await userController.getAllUsers();

      expect(userService.getAllUsers).toHaveBeenCalled();
      expect(res).toEqual([user]);
    });

    it('should get a single user by id', async () => {
      jest.spyOn(userService, 'getUserById');
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

      const res = await userController.getUserById('id');

      expect(userService.getUserById).toHaveBeenCalledWith('id');
      expect(res).toEqual(user);
    });
  });

  describe('POST', () => {
    it('should create a single user', async () => {
      jest
        .spyOn(authUtilService, 'createToken')
        .mockResolvedValue({ access_token: 'token' });
      jest.spyOn(userService, 'createUser');
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      const data = {
        email: 'testemail',
        password: 'testpassword',
      };

      const res = await userController.createUser(
        data,
        mockResponse as Response
      );

      expect(userService.createUser).toHaveBeenCalledWith(data);
      expect(res).toEqual({
        message: 'success',
        user: {
          email: data.email,
          user_id: 'uuid',
          created_at: date,
        },
      });
    });
  });

  describe('PATCH', () => {
    it('should update a single user by id', async () => {
      jest.spyOn(userService, 'updateUserById');

      const data = {
        password: 'newpassword',
      };

      const res = await userController.updateUserById('uuid', data);

      expect(userService.updateUserById).toHaveBeenCalledWith('uuid', data);
      expect(res).toEqual({
        message: 'success',
      });
    });
  });

  describe('DELETE', () => {
    it('should delete a single user by id', async () => {
      jest.spyOn(userService, 'deleteUserById');

      const res = await userController.deleteUserById('uuid');

      expect(userService.deleteUserById).toHaveBeenCalledWith('uuid');
      expect(res).toEqual({
        message: 'success',
      });
    });
  });
});
