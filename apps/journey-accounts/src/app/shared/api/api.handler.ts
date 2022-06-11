import axios, { AxiosError, AxiosResponse } from 'axios';
import { HttpException } from '@nestjs/common';
import { ICreateUser } from '@journey-monorepo/util';

const BASE_URL = process.env['NX_AAPI_BASE_URL'];

export const handleError = (error: AxiosError<HttpException>) => {
  return error?.response?.data;
};

export const createUser = async (createUserData: ICreateUser) => {
  const response: AxiosResponse<{ access_token: string } | HttpException> =
    await axios.post(`${BASE_URL}/users`, createUserData);

  if (axios.isAxiosError(response)) {
    return response.response?.data;
  }

  return response;
};
