import { FC, ReactNode } from 'react';
import { ActionDialog } from './Action/ActionDialog';
import { ConfirmationDialog } from './Confirmation/ConfirmationDialog';

export type DialogType = 'action' | 'confirmation';

interface DialogContainerProps {
  type: DialogType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dialogProps: any;
  children: ReactNode;
}

export const DialogContainer: FC<DialogContainerProps> = (
  props: DialogContainerProps
) => {
  switch (props.type) {
    case 'action':
      return (
        <ActionDialog {...props.dialogProps}>{props.children}</ActionDialog>
      );
    case 'confirmation':
    default:
      return (
        <ConfirmationDialog {...props.dialogProps}>
          {props.children}
        </ConfirmationDialog>
      );
  }
};
