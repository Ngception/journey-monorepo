import axios from 'axios';
import { ICreateUser, ILoginUser } from '@journey-monorepo/util';

const BASE_URL = process.env['NX_AAPI_BASE_URL'];

export const createUser = async (createUserData: ICreateUser) => {
  const { data } = await axios.post(`${BASE_URL}/users`, createUserData);

  return data;
};

export const loginUser = async (loginUserData: ILoginUser) => {
  const { data } = await axios.post(`${BASE_URL}/users`, loginUserData);

  return data;
};
