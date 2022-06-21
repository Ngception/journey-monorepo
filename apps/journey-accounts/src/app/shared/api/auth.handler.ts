import axios, { AxiosResponse } from 'axios';
import { ILoginUser } from '@journey-monorepo/util';

const BASE_URL = process.env['NX_AAPI_BASE_URL'];

export const loginUser = async (loginUserData: ILoginUser) => {
  const {
    data,
  }: AxiosResponse<{
    message: string;
    user: { user_id: string; email: string; created_at: Date };
  }> = await axios.post(`${BASE_URL}/auth/login`, loginUserData, {
    withCredentials: true,
  });

  return data;
};

export const logoutUser = async () => {
  const { data }: AxiosResponse<{ message: string }> = await axios.post(
    `${BASE_URL}/auth/logout`,
    undefined,
    {
      withCredentials: true,
    }
  );

  return data;
};
