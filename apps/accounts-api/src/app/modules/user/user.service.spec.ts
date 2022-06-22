import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUser } from '@journey-monorepo/util';
import { AuthUtilModule } from '../../shared/auth/auth-util.module';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthUtilService } from '../../shared/auth/auth-util.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let authUtilService: AuthUtilService;

  const user = createUser();
  const date = new Date();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthUtilModule],
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
    authUtilService = module.get<AuthUtilService>(AuthUtilService);

    jest
      .spyOn(global, 'Date')
      .mockImplementation(() => date as unknown as string);
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
      const mockToken = {
        access_token: 'token',
      };

      const data = {
        email: 'email',
        password: 'password',
        created_at: date,
        updated_at: date,
      };

      jest.spyOn(authUtilService, 'hashData').mockResolvedValue(data.password);
      jest.spyOn(authUtilService, 'createToken').mockResolvedValue(mockToken);
      jest.spyOn(userService, 'createUser');
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(userRepository, 'create');
      jest.spyOn(userRepository, 'insert');

      const res = await userService.createUser(data);

      expect(res).toEqual({
        ...mockToken,
        created_at: date,
        user_id: 'uuid',
      });
      expect(userRepository.create).toHaveBeenCalledWith(data);
      expect(userRepository.insert).toHaveBeenCalled();
    });
  });

  describe('PATCH', () => {
    it('should update a single user by id', async () => {
      jest.spyOn(userService, 'updateUserById');
      jest.spyOn(userRepository, 'update');

      const data = {
        password: 'password',
        updated_at: date,
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
