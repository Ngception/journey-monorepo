import { FC, FormEvent, useRef, useState } from 'react';
import {
  Button,
  DialogContainer,
  Icon,
  useNotification,
} from '@journey-monorepo/ui';
import { deleteUser, useError, useLogout, useUser } from '../../../../shared';

import styles from './AccountPreferencesDeleteAccount.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AccountPreferencesDeleteAccountProps {}

export const AccountPreferencesDeleteAccount: FC<
  AccountPreferencesDeleteAccountProps
> = (props: AccountPreferencesDeleteAccountProps) => {
  const deleteAccountTrigger = useRef<HTMLButtonElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { state: user } = useUser();
  const handleLogout = useLogout();
  const { showSuccessNotification } = useNotification();
  const handleError = useError();

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = async (event: FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await deleteUser({
        user_id: user.user_id,
      });

      setIsDialogOpen(false);
      showSuccessNotification('Account has been successfully deleted.');
      handleLogout();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError(err);
    }

    setIsLoading(false);
  };

  const confirmationDialogProps = {
    title: 'Confirm account deletion',
    trigger: deleteAccountTrigger,
    showDanger: true,
    confirmButtonColor: 'danger',
    confirmHandler: (event: FormEvent) => handleConfirm(event),
    cancelHandler: () => closeDialog(),
    isDialogOpen: isDialogOpen,
    isLoading,
  };

  return (
    <div>
      <div>
        <h2 className="subtitle is-4">Delete your account</h2>
        <div className={styles['delete-warning']}>
          <span className="has-text-danger">
            <Icon type="solid" name="triangle-exclamation" />
          </span>
          <p>
            When you delete your account, you lose access to Journey account
            services, and we permanently delete your personal data.
          </p>
        </div>
      </div>
      <div className={styles['actions']}>
        <Button
          testId="delete-account-dialog-trigger"
          triggerRef={deleteAccountTrigger}
          color="danger"
          clickHandler={() => openDialog()}
        >
          <span>Delete account</span>
        </Button>
      </div>

      {isDialogOpen && (
        <DialogContainer
          type="confirmation"
          dialogProps={confirmationDialogProps}
        >
          <div className={styles['dialog-content']}>
            <span className="">
              <Icon type="solid" name="triangle-exclamation" />
            </span>
            <p>
              You are about to delete your account. Once confirmed, you will
              lose access and this action cannot be undone.
            </p>
          </div>
        </DialogContainer>
      )}
    </div>
  );
};
