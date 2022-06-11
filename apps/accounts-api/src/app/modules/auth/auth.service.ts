import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthUtilService } from '../../shared/auth/auth-util.service';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private authUtilService: AuthUtilService,
    private userService: UserService
  ) {}

  async validateUser(
    data: LoginUserDto
  ): Promise<{ access_token: string } | void> {
    const user = await this.userService.getUser({
      email: data.email,
    });

    if (user) {
      const isMatch = await bcrypt.compare(data.password, user.password);

      if (isMatch) {
        return this.authUtilService.createToken({
          user_id: user.user_id,
          email: user.email,
        });
      }
    }

    return await this.authUtilService.throwError(401, 'Invalid login attempt.');
  }
}
