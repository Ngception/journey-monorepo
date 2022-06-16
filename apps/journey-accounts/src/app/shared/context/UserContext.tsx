import { createContext, FC, ReactNode, useReducer } from 'react';
import {
  InitialUserStateInterface,
  userInitialState,
  userReducer,
  USER_ACTIONS,
} from '../reducer';

export interface IUserContext {
  state: InitialUserStateInterface;
  // dispatch: Dispatch<UserAction>;
  setUser: (userInfo: InitialUserStateInterface) => void;
  clearUser: () => void;
}

export const UserContext = createContext<IUserContext | null>(null);

interface UserProviderProps {
  initialState?: InitialUserStateInterface;
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({
  initialState,
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);

  const value = {
    state: initialState || (state as InitialUserStateInterface),
    setUser: (userInfo: InitialUserStateInterface) =>
      dispatch({ type: USER_ACTIONS.SET_USER, payload: userInfo }),
    clearUser: () => dispatch({ type: USER_ACTIONS.CLEAR_USER }),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
