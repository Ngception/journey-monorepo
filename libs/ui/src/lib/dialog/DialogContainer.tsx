import { FC, ReactNode, useEffect, useState } from 'react';
import { Animate } from '../animate';
import { ActionDialog } from './Action/ActionDialog';
import { ConfirmationDialog } from './Confirmation/ConfirmationDialog';
import { useDialog } from './hook/useDialog';

export type DialogType = 'action' | 'confirmation';

interface DialogContainerProps {
  type?: DialogType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dialogProps?: any;
  children?: ReactNode;
}

export const DialogContainer: FC<DialogContainerProps> = (
  props: DialogContainerProps
) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { state: dialog } = useDialog();

  useEffect(() => {
    setIsDialogOpen(dialog.isActive);
  }, [dialog.isActive]);

  const renderDialog = () => {
    switch (dialog.type) {
      case 'action':
        return <ActionDialog {...dialog.props}>{dialog.content}</ActionDialog>;
      case 'confirmation':
        return (
          <ConfirmationDialog {...dialog.props}>
            {dialog.content}
          </ConfirmationDialog>
        );
      default:
        return null;
    }
  };

  return <Animate>{isDialogOpen && renderDialog()}</Animate>;
};
