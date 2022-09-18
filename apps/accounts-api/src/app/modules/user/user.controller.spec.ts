/* eslint-disable @typescript-eslint/no-explicit-any */
import { Repository } from 'typeorm';
import { Response } from 'express';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createUser } from '@journey-monorepo/util';
import { AuthUtilModule } from '../../shared/auth/auth-util.module';
import { EmailModule } from '../email/email.module';
import { EmailService } from '../email/email.service';
import { JwtAuthGuard } from '../auth/guards';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserAccessTokenService } from '../token/user-access/user-access.service';
import { UserAccessTokenModule } from '../token/user-access/user-access.module';
import { ConfigModule } from '@nestjs/config';

describe('UserController', () => {
  let userService: UserService,
    userController: UserController,
    userAccessTokenService: UserAccessTokenService;

  const user = createUser(),
    date = new Date(),
    responseObject = {
      status: 201,
      message: 'success',
    },
    mockResponse: Partial<Response> = {
      status: jest.fn().mockImplementation().mockReturnValue(201),
      json: jest.fn().mockImplementation().mockReturnValue(responseObject),
      cookie: jest.fn().mockImplementation().mockReturnValue('cookie'),
      clearCookie: jest.fn(),
    };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        AuthUtilModule,
        EmailModule,
        UserAccessTokenModule,
        ConfigModule,
      ],
      controllers: [UserController],
      providers: [
        UserService,
        EmailService,
        {
          provide: getRepositoryToken(User),
          useValue: Repository,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
    userAccessTokenService = module.get<UserAccessTokenService>(
      UserAccessTokenService
    );

    jest.useFakeTimers('modern');
    jest.setSystemTime(date);
  });

  describe('GET', () => {
    it('should get a single user by id', async () => {
      jest.spyOn(userService, 'getUserById').mockResolvedValue(user);

      const res = await userController.getUserById('id');

      expect(userService.getUserById).toHaveBeenCalledWith('id');
      expect(res).toEqual(user);
    });
  });

  describe('POST', () => {
    it('should create a single user', async () => {
      const data = {
        email: 'testemail',
        password: 'testpassword',
      };

      jest
        .spyOn(userAccessTokenService, 'createToken')
        .mockReturnValue('token');
      jest
        .spyOn(userService, 'createUser')
        .mockImplementation(jest.fn())
        .mockResolvedValue({
          user_id: 'uuid',
          access_token: 'token',
          created_at: date,
        });

      const res = await userController.createUser(
        data,
        mockResponse as Response
      );

      expect(userService.createUser).toHaveBeenCalledWith(data);
      expect(res).toEqual(
        expect.objectContaining({
          message: 'success',
          user: {
            email: data.email,
            user_id: 'uuid',
            created_at: date,
          },
        })
      );
    });
  });

  describe('PATCH', () => {
    it('should update a single user by id', async () => {
      jest.restoreAllMocks();
      jest
        .spyOn(userService, 'updateUserById')
        .mockImplementation(jest.fn())
        .mockResolvedValue(1);

      const data = {
        password: 'newpassword',
        date: new Date(),
      };

      const res = await userController.updateUserById('uuid', data);

      expect(res).toEqual(1);
      expect(userService.updateUserById).toHaveBeenCalledWith('uuid', data);
    });
  });

  describe('DELETE', () => {
    it('should delete a single user by id', async () => {
      jest
        .spyOn(userService, 'deleteUserById')
        .mockImplementation(jest.fn())
        .mockResolvedValue(1);

      const res = await userController.deleteUserById('uuid');

      expect(res).toEqual(1);
      expect(userService.deleteUserById).toHaveBeenCalledWith('uuid');
    });
  });
});
