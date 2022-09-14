import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAccessTokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  createToken(payload: { user_id: string; email: string }): string {
    return this.jwtService.sign(payload, {
      expiresIn:
        parseInt(this.configService.get('NX_USER_ACCESS_TOKEN_EXPIRATION')) ||
        300,
    });
  }
}
