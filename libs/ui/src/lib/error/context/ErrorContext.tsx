import { createContext, FC, ReactNode, useReducer } from 'react';
import {
  errorInitialState,
  errorReducer,
  ERROR_ACTIONS,
  InitialErrorStateInterface,
} from '../reducer/error.reducer';

export interface IErrorContext {
  state: InitialErrorStateInterface;
  showNotFoundError: () => void;
  showGeneralError: () => void;
  clearError: () => void;
}

export const ErrorContext = createContext<IErrorContext | null>(null);

interface ErrorProviderProps {
  initialState?: InitialErrorStateInterface;
  children: ReactNode;
}

export const ErrorProvider: FC<ErrorProviderProps> = ({
  initialState,
  children,
}) => {
  const [state, dispatch] = useReducer(errorReducer, errorInitialState);

  const value = {
    state: initialState || (state as InitialErrorStateInterface),
    showNotFoundError: () =>
      dispatch({
        type: ERROR_ACTIONS.SET_ERROR,
        payload: {
          status: 404,
        },
      }),
    showGeneralError: () =>
      dispatch({
        type: ERROR_ACTIONS.SET_ERROR,
        payload: {
          status: 500,
        },
      }),
    clearError: () =>
      dispatch({
        type: ERROR_ACTIONS.CLEAR_ERROR,
      }),
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
