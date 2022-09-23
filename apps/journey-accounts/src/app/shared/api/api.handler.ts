import axios, { AxiosError, AxiosResponse } from 'axios';
import { HttpException } from '@nestjs/common';
import { ICreateUser, IDeleteUser, IUpdateUser } from '@journey-monorepo/util';

const AAPI_BASE_URL = process.env['NX_AAPI_BASE_URL'],
  JAPI_BASE_URL = process.env['NX_JAPI_BASE_URL'];

export const handleError = (error: AxiosError<HttpException>) => {
  return error?.response?.data;
};

export const createUser = async (createUserData: ICreateUser) => {
  const {
    data,
  }: AxiosResponse<{
    message: string;
    user: {
      user_id: string;
      email: string;
      created_at: Date;
    };
  }> = await axios.post(`${AAPI_BASE_URL}/users`, createUserData, {
    withCredentials: true,
  });

  return data;
};

export const updateUser = async (updateUserData: IUpdateUser) => {
  const { data }: AxiosResponse<number> = await axios.patch(
    `${AAPI_BASE_URL}/users/${updateUserData.user_id}`,
    {
      password: updateUserData.password,
    },
    {
      withCredentials: true,
    }
  );

  return data;
};

export const deleteUser = async (deleteUserData: IDeleteUser) => {
  const { data }: AxiosResponse<number> = await axios.delete(
    `${AAPI_BASE_URL}/users/${deleteUserData.user_id}`,
    {
      withCredentials: true,
    }
  );

  return data;
};

export const deleteTasksByUserId = async (userId: string) => {
  const { data }: AxiosResponse<number> = await axios.delete(
    `${JAPI_BASE_URL}/tasks`,
    {
      data: { user_id: userId },
      withCredentials: true,
    }
  );

  return data;
};
