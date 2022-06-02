import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUser } from '@journey-monorepo/util';
import { hashData } from '../../shared/auth/auth.util';
import { User } from './user.entity';
import { UserService } from './user.service';

// Mock utils module to be able mock certain methods
jest.mock('../../shared/auth/auth.util', () => {
  const originalModule = jest.requireActual('@journey-monorepo/util');

  return {
    ...originalModule,
    hashData: jest.fn(),
  };
});

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const user = createUser();
  const date = new Date().toString();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
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
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));

    jest.spyOn(global, 'Date').mockReturnValue(date);
  });

  describe('GET', () => {
    it('should get all users', async () => {
      jest.spyOn(userService, 'getAllUsers');
      jest.spyOn(userRepository, 'find');

      const res = await userService.getAllUsers();

      expect(res).toEqual([user]);
      expect(userRepository.find).toHaveBeenCalled();
    });

    it('should get a single user by id', async () => {
      jest.spyOn(userService, 'getUserById');
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

      const res = await userService.getUserById('id');

      expect(res).toEqual(user);
      expect(userRepository.findOneBy).toHaveBeenCalled();
    });
  });

  describe('POST', () => {
    it('should create a single user', async () => {
      const mocked = { hashData };

      jest.spyOn(mocked, 'hashData').mockResolvedValue('password');
      jest.spyOn(userService, 'createUser');
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(userRepository, 'create');
      jest.spyOn(userRepository, 'insert');

      const data = {
        email: 'email',
        password: 'password',
      };

      const createData = {
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const res = await userService.createUser(data);

      expect(res).toEqual('uuid');
      expect(userRepository.create).toHaveBeenCalledWith(createData);
      expect(userRepository.insert).toHaveBeenCalled();
    });
  });

  describe('PATCH', () => {
    it('should update a single user by id', async () => {
      jest.spyOn(userService, 'updateUserById');
      jest.spyOn(userRepository, 'update');

      const data = {
        password: 'newpassword',
        updated_at: new Date(),
      };

      const res = await userService.updateUserById('uuid', data);

      expect(res).toEqual(1);
      expect(userRepository.update).toHaveBeenCalledWith('uuid', data);
    });
  });

  describe('DELETE', () => {
    it('should delete a single user by id', async () => {
      jest.spyOn(userService, 'deleteUserById');
      jest.spyOn(userRepository, 'delete');

      const res = await userService.deleteUserById('uuid');

      expect(res).toEqual(1);
      expect(userRepository.delete).toHaveBeenCalledWith({ user_id: 'uuid' });
    });
  });
});
