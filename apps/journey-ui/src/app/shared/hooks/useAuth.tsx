import { useContext } from 'react';
import { AuthContext, IAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  return useContext(AuthContext) as IAuthContext;
};
