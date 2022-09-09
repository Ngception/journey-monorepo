import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordToken } from './reset-password.entity';
import { ResetPasswordTokenService } from './reset-password.service';

describe('ResetPasswordTokenService', () => {
  let resetPasswordTokenService: ResetPasswordTokenService,
    jwtService: JwtService,
    resetPasswordTokenRepository: Repository<ResetPasswordToken>;

  const date = new Date();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ResetPasswordTokenService,
        JwtService,
        {
          provide: getRepositoryToken(ResetPasswordToken),
          useValue: {
            create: jest.fn(),
            insert: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    resetPasswordTokenService = module.get<ResetPasswordTokenService>(
      ResetPasswordTokenService
    );
    jwtService = module.get<JwtService>(JwtService);
    resetPasswordTokenRepository = module.get<Repository<ResetPasswordToken>>(
      getRepositoryToken(ResetPasswordToken)
    );

    jest.useFakeTimers('modern');
    jest.setSystemTime(date);
  });

  describe('createToken', () => {
    it('should create a JWT', () => {
      const mockJWT = 'jwt',
        mockPayload = {
          token_id: 'token-uuid',
          user_id: 'user-uuid',
        };

      jest
        .spyOn(jwtService, 'sign')
        .mockImplementation(jest.fn())
        .mockReturnValue(mockJWT);

      const JWT = resetPasswordTokenService.createToken(mockPayload);

      expect(JWT).toEqual(mockJWT);
      expect(jwtService.sign).toHaveBeenCalledWith(mockPayload);
    });
  });

  describe('verifyToken', () => {
    it('should successfully verify a reset token', () => {
      const mockVerifiedToken = {
        token_id: 'token-uuid',
        user_id: 'user-uuid',
      };

      jest
        .spyOn(jwtService, 'verify')
        .mockImplementation(jest.fn())
        .mockReturnValue(mockVerifiedToken);

      const token = resetPasswordTokenService.verifyToken('token');

      expect(token).toEqual(mockVerifiedToken);
      expect(jwtService.verify).toHaveBeenCalledWith('token');
    });

    it('should fail to verify a reset token', () => {
      jest.spyOn(jwtService, 'verify');

      const token = resetPasswordTokenService.verifyToken('token');

      expect(token).toEqual(false);
      expect(jwtService.verify).toHaveBeenCalledWith('token');
    });
  });

  describe('saveToken', () => {
    it('should save reset token', async () => {
      const mockPayload = {
          user_id: 'user-uuid',
          expires_at: date,
        },
        mockResetToken = {
          token_id: 'token-uuid',
          user_id: 'user-uuid',
          expires_at: date,
        };

      jest
        .spyOn(resetPasswordTokenRepository, 'create')
        .mockImplementation(jest.fn())
        .mockReturnValue(mockResetToken);
      jest.spyOn(resetPasswordTokenRepository, 'insert').mockResolvedValue({
        identifiers: [{ token_id: mockResetToken['token_id'] }],
        generatedMaps: [{}],
        raw: null,
      });

      const res = await resetPasswordTokenService.saveToken(mockPayload);

      expect(res).toEqual(mockResetToken['token_id']);
      expect(resetPasswordTokenRepository.create).toHaveBeenCalledWith(
        mockPayload
      );
      expect(resetPasswordTokenRepository.insert).toHaveBeenCalledWith(
        mockResetToken
      );
    });
  });

  describe('getToken', () => {
    it('should fetch saved token', async () => {
      const mockData = {
          user_id: 'user-uuid',
          token_id: 'token-uuid',
        },
        mockResetToken = {
          ...mockData,
          expires_at: date,
        };

      jest
        .spyOn(resetPasswordTokenRepository, 'findOneBy')
        .mockResolvedValue(mockResetToken);

      const res = await resetPasswordTokenService.getToken(mockData);

      expect(res).toEqual(mockResetToken);
      expect(resetPasswordTokenRepository.findOneBy).toHaveBeenCalledWith(
        mockData
      );
    });
  });

  describe('deleteTokenById', () => {
    it('should delete a saved token by id', async () => {
      const mockTokenId = 'token-uuid',
        deleteResult = {
          raw: null,
          affected: 1,
        };

      jest
        .spyOn(resetPasswordTokenRepository, 'delete')
        .mockResolvedValue(deleteResult);

      const res = await resetPasswordTokenService.deleteTokenById(mockTokenId);

      expect(res).toEqual(deleteResult.affected);
      expect(resetPasswordTokenRepository.delete).toHaveBeenCalledWith({
        token_id: mockTokenId,
      });
    });
  });
});
