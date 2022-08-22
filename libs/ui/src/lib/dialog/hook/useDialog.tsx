import { useContext } from 'react';
import { DialogContext, IDialogContext } from '../context/DialogContext';

export const useDialog = () => {
  return useContext(DialogContext) as IDialogContext;
};
