import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ControllerUtilService {
  handleStatus(status: string) {
    switch (status) {
      case 'Unauthorized':
        throw new UnauthorizedException();
      case 'Conflict':
        throw new ConflictException();
      case 'Failed':
        throw new HttpException(
          'Expectation failed',
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
