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
  initialState?: initialAuthStateType;
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({
  initialState,
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  return (
    <AuthContext.Provider value={{ state: initialState || state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
