import { useContext } from 'react';
import { IUserContext, UserContext } from '../context';

export const useUser = () => {
  return useContext(UserContext) as IUserContext;
};
