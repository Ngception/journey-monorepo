import { createContext, Dispatch, FC, ReactNode, useReducer } from 'react';
import {
  Action,
  initialAuthStateType,
  authInitialState,
  authReducer,
} from '../reducer';

export interface AuthContextType {
  state: initialAuthStateType;
  dispatch: Dispatch<Action>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
