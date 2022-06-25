import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from '../../../shared/auth/auth-util.constants';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: (req) => {
        if (req?.signedCookies) {
          return req.signedCookies['user'];
        }
      },
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload) {
    const user = await this.userService.getUser({
      email: payload.email,
      user_id: payload.user_id,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
