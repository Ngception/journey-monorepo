import axios, { AxiosResponse } from 'axios';
import { ITask } from '@journey-monorepo/util';

const BASE_URL = process.env['NX_JAPI_BASE_URL'];

export const getAllTasksByUserId = async (
  userId?: string
): Promise<ITask[] | []> => {
  const { data }: AxiosResponse<ITask[]> = await axios.get(
    `${BASE_URL}/tasks?user=${userId}`
  );

  return data;
};
