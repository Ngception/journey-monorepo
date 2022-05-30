import { IUser } from '../interfaces';

export const UserListFixture: IUser[] = [
  {
    user_id: '6563sfd',
    email: 'email1@test.com',
    password: '2345rt@#%g',
    created_at: new Date(),
    updated_at: null,
  },
  {
    user_id: 'abc123',
    email: 'email2@test.com',
    password: 'fef09@#@%',
    created_at: new Date(),
    updated_at: null,
  },
  {
    user_id: 'abc123',
    email: 'email3@test.com',
    password: '@#$%^&*gvhbjn',
    created_at: new Date(),
    updated_at: null,
  },
];

export const UserFixture: IUser = {
  user_id: 'abc123',
  email: 'email@test.com',
  password: '1a2@b3#c0z!',
  created_at: new Date(),
  updated_at: null,
};
