import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const hashData = async (
  data: string,
  saltRounds = 10
): Promise<string> => {
  return await bcrypt.hash(data, saltRounds);
};

export const throwError = (statusCode?: number, error?: string) => {
  switch (statusCode) {
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
};
