import { ReactNode } from 'react';

export interface DialogAction {
  type: string;
  payload?: any;
}

export interface InitialDialogStateInterface {
  type: string;
  content: ReactNode;
  props: any;
  isActive: boolean;
}

export const DIALOG_ACTIONS = {
  SHOW_DIALOG: 'show dialog',
  CLEAR_DIALOG: 'clear dialog',
};

export const dialogInitialState = {
  type: '',
  content: null,
  props: null,
  isActive: false,
};

export const dialogReducer = (
  state = dialogInitialState,
  action: DialogAction
) => {
  switch (action.type) {
    case DIALOG_ACTIONS.SHOW_DIALOG:
      return {
        ...action.payload,
      };
    case DIALOG_ACTIONS.CLEAR_DIALOG:
      return dialogInitialState;
    default:
      return state;
  }
};
