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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addTask = async (newTaskData: any): Promise<string> => {
  const { data }: AxiosResponse<string> = await axios.post(
    `${BASE_URL}/tasks`,
    newTaskData
  );

  return data;
};

export const updateTask = async (updatedTaskData: any): Promise<number> => {
  const { data }: AxiosResponse<number> = await axios.patch(
    `${BASE_URL}/tasks/${updatedTaskData.task_id}`,
    updatedTaskData
  );

  return data;
};
