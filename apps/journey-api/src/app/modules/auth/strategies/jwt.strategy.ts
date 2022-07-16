import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

const JWT_CONSTANTS = {
  secret: process.env['NX_JWT_SECRET_KEY'],
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => req?.signedCookies?.user,
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANTS.secret,
    });
  }

  async validate(payload) {
    const { user_id } = payload;

    if (!user_id) {
      throw new UnauthorizedException();
    }
  }
}
