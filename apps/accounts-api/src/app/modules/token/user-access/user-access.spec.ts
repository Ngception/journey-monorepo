import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { UserAccessTokenService } from './user-access.service';

describe('UserAccessTokenService', () => {
  let userAccessTokenService: UserAccessTokenService, jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserAccessTokenService, JwtService],
    }).compile();

    userAccessTokenService = module.get<UserAccessTokenService>(
      UserAccessTokenService
    );
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('createToken', () => {
    it('should create JWT', () => {
      const mockPayload = {
          user_id: 'user-uuid',
          email: 'hello@email.com',
        },
        mockJWT = 'jwt';

      jest
        .spyOn(jwtService, 'sign')
        .mockImplementation(jest.fn())
        .mockReturnValue(mockJWT);

      const token = userAccessTokenService.createToken(mockPayload);

      expect(token).toEqual(mockJWT);
      expect(jwtService.sign).toHaveBeenCalledWith(mockPayload);
    });
  });
});
