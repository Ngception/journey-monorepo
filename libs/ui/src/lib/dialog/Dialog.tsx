import { FC, ReactNode } from 'react';
import { Animate } from '../animate';
import { ActionDialog } from './Action/ActionDialog';
import { ConfirmationDialog } from './Confirmation/ConfirmationDialog';

export type DialogType = 'action' | 'confirmation';

interface DialogProps {
  type: DialogType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dialogProps: any;
  children: ReactNode;
}

export const Dialog: FC<DialogProps> = (props: DialogProps) => {
  const renderDialog = () => {
    switch (props.type) {
      case 'action':
        return (
          <ActionDialog {...props.dialogProps}>{props.children}</ActionDialog>
        );
      case 'confirmation':
        return (
          <ConfirmationDialog {...props.dialogProps}>
            {props.children}
          </ConfirmationDialog>
        );
      default:
        return null;
    }
  };

  return <Animate>{props.dialogProps?.isDialogOpen && renderDialog()}</Animate>;
};
