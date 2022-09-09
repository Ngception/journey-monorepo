import axios, { AxiosResponse } from 'axios';
import { ILoginUser } from '@journey-monorepo/util';

const BASE_URL = process.env['NX_AAPI_BASE_URL'];

export const loginUser = async (loginUserData: ILoginUser) => {
  const {
    data,
  }: AxiosResponse<{
    message: string;
    user: {
      user_id: string;
      email: string;
      created_at: Date;
    };
  }> = await axios.post(`${BASE_URL}/auth/login`, loginUserData, {
    withCredentials: true,
  });

  return data;
};

export const requestUserPasswordReset = async (
  email: string
): Promise<{ status: string }> => {
  const { data }: AxiosResponse<{ status: string }> = await axios.post(
    `${BASE_URL}/auth/login/password/reset`,
    {
      email,
    }
  );

  return data;
};

export const resetUserPassword = async (
  token: string,
  userData: { password: string }
): Promise<{ status: string }> => {
  const { data }: AxiosResponse<{ status: string }> = await axios.post(
    `${BASE_URL}/auth/login/password/reset/${token}`,
    userData
  );

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

export const verifyAuthStatus = async () => {
  const {
    data,
  }: AxiosResponse<{
    message: string;
    user: {
      user_id: string;
      email: string;
      created_at: Date;
    };
  }> = await axios.get(`${BASE_URL}/auth/status`, { withCredentials: true });

  return data;
};

export const verifyResetToken = async (
  token: string
): Promise<{ status: string }> => {
  const { data }: AxiosResponse<{ status: string }> = await axios.get(
    `${BASE_URL}/auth/login/password/reset/${token}`
  );

  return data;
};
