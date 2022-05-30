import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUser } from '@journey-monorepo/util';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const user = createUser();
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue([user]),
            findOneBy: jest.fn().mockResolvedValue(user),
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
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
      jest.spyOn(userRepository, 'findOneBy');

      const res = await userService.getUserById('id');

      expect(res).toEqual(user);
      expect(userRepository.findOneBy).toHaveBeenCalled();
    });
  });
});
