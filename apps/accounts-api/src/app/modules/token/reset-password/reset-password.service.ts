import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ResetPasswordToken } from './reset-password.entity';

type ResetTokenId = string;

@Injectable()
export class ResetPasswordTokenService {
  constructor(
    @InjectRepository(ResetPasswordToken)
    private repo: Repository<ResetPasswordToken>,
    private jwtService: JwtService
  ) {}

  createToken(payload: { token_id: string; user_id: string }): string {
    return this.jwtService.sign(payload);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verifyToken(token: string): Record<string, any> | false {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      return false;
    }
  }

  async saveToken(payload: {
    user_id: string;
    expires_at: Date;
  }): Promise<ResetTokenId> {
    const newToken = this.repo.create(payload);
    const { identifiers } = await this.repo.insert(newToken);

    return identifiers[0].token_id;
  }

  async getToken(data: {
    user_id?: string;
    token_id?: string;
  }): Promise<ResetPasswordToken> {
    return await this.repo.findOneBy(data);
  }

  async deleteTokenById(id: string): Promise<DeleteResult['affected']> {
    const { affected } = await this.repo.delete({
      token_id: id,
    });

    return affected;
  }
}
