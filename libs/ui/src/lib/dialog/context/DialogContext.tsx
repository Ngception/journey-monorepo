import { createContext, FC, ReactNode, useReducer } from 'react';
import {
  DIALOG_ACTIONS,
  dialogReducer,
  dialogInitialState,
  InitialDialogStateInterface,
} from '../reducer/dialog.reducer';
import { ActionDialogProps } from '../Action/ActionDialog';
import { ConfirmationDialogProps } from '../Confirmation/ConfirmationDialog';

export interface IDialogContext {
  state: InitialDialogStateInterface;
  showActionDialog: (
    content: ReactNode,
    dialogProps: ActionDialogProps
  ) => void;
  showConfirmationDialog: (
    content: ReactNode,
    dialogProps: ConfirmationDialogProps
  ) => void;
  clearDialog: () => void;
}

export const DialogContext = createContext<IDialogContext | null>(null);

interface DialogProviderProps {
  initialState?: InitialDialogStateInterface;
  children: ReactNode;
}

export const DialogProvider: FC<DialogProviderProps> = ({
  initialState,
  children,
}) => {
  const [state, dispatch] = useReducer(dialogReducer, dialogInitialState);

  const value = {
    state: initialState || (state as InitialDialogStateInterface),
    showActionDialog: (content: ReactNode, dialogProps: ActionDialogProps) =>
      dispatch({
        type: DIALOG_ACTIONS.SHOW_DIALOG,
        payload: {
          type: 'action',
          isActive: true,
          props: dialogProps,
          content,
        },
      }),
    showConfirmationDialog: (
      content: ReactNode,
      dialogProps: ConfirmationDialogProps
    ) =>
      dispatch({
        type: DIALOG_ACTIONS.SHOW_DIALOG,
        payload: {
          type: 'confirmation',
          isActive: true,
          props: dialogProps,
          content,
        },
      }),
    clearDialog: () =>
      dispatch({
        type: DIALOG_ACTIONS.CLEAR_DIALOG,
      }),
  };

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
};
