export interface IUpdateUser {
  user_id: string;
  password: string;
}

export interface ICreateUser {
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser {
  user_id: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date | null;
}
