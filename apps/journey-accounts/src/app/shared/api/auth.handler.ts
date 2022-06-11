import axios, { AxiosResponse } from 'axios';
import { ILoginUser } from '@journey-monorepo/util';

const BASE_URL = process.env['NX_AAPI_BASE_URL'];

export const loginUser = async (loginUserData: ILoginUser) => {
  const { data }: AxiosResponse<{ access_token: string }> = await axios.post(
    `${BASE_URL}/auth/login`,
    loginUserData
  );

  return data;
};
