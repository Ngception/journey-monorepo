import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from '../../token/user-access/user-access.constants';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: (req) => req?.signedCookies?.user,
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
