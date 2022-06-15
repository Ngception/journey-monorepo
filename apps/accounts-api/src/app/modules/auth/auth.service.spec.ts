import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { createUser } from '@journey-monorepo/util';
import { User } from '../user/user.entity';
import { AuthUtilService } from '../../shared/auth/auth-util.service';
import { AuthUtilModule } from '../../shared/auth/auth-util.module';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let authUtilService: AuthUtilService;
  let userService: UserService;

  const user = createUser();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthUtilModule],
      providers: [
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    authUtilService = module.get<AuthUtilService>(AuthUtilService);
    userService = module.get<UserService>(UserService);
  });

  describe('validateUser', () => {
    it('should return an access token if user is successfully validated', async () => {
      const mockToken = { access_token: 'token' };

      jest.spyOn(userService, 'getUser').mockResolvedValue(user);
      jest.spyOn(authUtilService, 'createToken').mockResolvedValue(mockToken);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);

      const res = await authService.validateUser(user);

      expect(res).toEqual(mockToken);
      expect(userService.getUser).toHaveBeenCalledWith({ email: user.email });
    });
  });
});