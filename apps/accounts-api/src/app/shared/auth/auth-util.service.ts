import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AuthUtilService {
  async hashData(data: string, saltRounds = 10): Promise<string> {
    return await bcrypt.hash(data, saltRounds);
  }

  async compareEncryptedData(source, target): Promise<boolean> {
    return await bcrypt.compare(source, target);
  }

  throwError(statusCode?: number, error?: string) {
    switch (statusCode) {
      case 401:
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error,
          },
          HttpStatus.UNAUTHORIZED
        );
      case 409:
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error,
          },
          HttpStatus.CONFLICT
        );
      case 417:
        throw new HttpException(
          {
            status: HttpStatus.EXPECTATION_FAILED,
            error,
          },
          HttpStatus.EXPECTATION_FAILED
        );
      default:
        throw new HttpException(
          {
            status: HttpStatus.EXPECTATION_FAILED,
            error: 'Something went wrong. Please try again later.',
          },
          HttpStatus.EXPECTATION_FAILED
        );
    }
  }
}
