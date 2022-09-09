import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAccessTokenService {
  constructor(private jwtService: JwtService) {}

  createToken(payload: { user_id: string; email: string }): string {
    return this.jwtService.sign(payload);
  }
}
