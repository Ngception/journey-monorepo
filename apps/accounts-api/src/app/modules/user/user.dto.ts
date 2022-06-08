export class CreateUserDto {
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date | null;
}

export class LoginUserDto {
  email: string;
  password: string;
}

export class UpdateUserDto {
  password: string;
}
