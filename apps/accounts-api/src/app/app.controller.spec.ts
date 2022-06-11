import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { User } from './modules/user/user.entity';
import { UserService } from './modules/user/user.service';
import { AuthUtilModule } from './shared/auth/auth-util.module';

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;
  let authService: AuthService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [AuthUtilModule],
      controllers: [AppController],
      providers: [
        AppService,
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: Repository,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    authService = app.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should login user and return an access token', async () => {
      const testUser = {
        email: 'email',
        password: 'password',
      };

      const mockToken = {
        access_token: 'token',
      };

      jest.spyOn(authService, 'validateUser').mockResolvedValue(mockToken);

      const res = await appController.login(testUser);

      expect(res).toEqual(mockToken);
      expect(authService.validateUser).toHaveBeenCalledWith(testUser);
    });
  });

  describe('getStatus', () => {
    it('should return status', () => {
      expect(appController.getStatus()).toEqual({
        message: 'OK',
      });
    });
  });
});
