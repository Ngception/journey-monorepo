import { useContext } from 'react';
import { IErrorContext, ErrorContext } from '../context/ErrorContext';

export const useError = () => {
  return useContext(ErrorContext) as IErrorContext;
};
