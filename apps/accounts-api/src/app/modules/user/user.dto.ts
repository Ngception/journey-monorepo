export class CreateUserDto {
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export class LoginUserDto {
  email: string;
  password: string;
}

export class UpdateUserDto {
  password: string;
}

export class RequestUserPasswordResetDto {
  email: string;
}
