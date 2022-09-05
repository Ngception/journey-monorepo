import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
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
  ): Promise<{ user_id: string; access_token: string; created_at: Date }> {
    const user = await this.userService.getUser({
      email: data.email,
    });

    if (user) {
      const isMatch = await bcrypt.compare(data.password, user.password);

      if (isMatch) {
        const { user_id, created_at } = user;
        const { access_token } = await this.authUtilService.createToken({
          user_id: user.user_id,
          email: user.email,
        });

        return {
          user_id,
          access_token,
          created_at,
        };
      }
    }
  }

  getAuthStatus(): { message: string } {
    return { message: 'OK' };
  }
}
