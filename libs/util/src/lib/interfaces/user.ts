export interface IUser {
  user_id: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date | null;
}
