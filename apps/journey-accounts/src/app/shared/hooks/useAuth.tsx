import { useContext } from 'react';
import { AuthContext, IAuthContext } from '../context';

export const useAuth = () => {
  return useContext(AuthContext) as IAuthContext;
};
