import { createContext, FC, ReactNode, useReducer } from 'react';
import {
  InitialAuthStateInterface,
  authInitialState,
  authReducer,
  AUTH_ACTIONS,
} from '../reducer';

export interface IAuthContext {
  state: InitialAuthStateInterface;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface AuthProviderProps {
  initialState?: InitialAuthStateInterface;
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({
  initialState,
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const value = {
    state: initialState || (state as InitialAuthStateInterface),
    login: () => dispatch({ type: AUTH_ACTIONS.LOGIN }),
    logout: () => dispatch({ type: AUTH_ACTIONS.LOGOUT }),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
