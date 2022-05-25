import { ConfirmationDialog, Icon } from '@journey-monorepo/ui';
import { FC, useRef, useState } from 'react';

import styles from './AccountPreferencesDeleteAccount.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AccountPreferencesDeleteAccountProps {}

export const AccountPreferencesDeleteAccount: FC<
  AccountPreferencesDeleteAccountProps
> = (props: AccountPreferencesDeleteAccountProps) => {
  const deleteAccountTrigger = useRef<HTMLButtonElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = () => {
    return console.log('Confirmed!');
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
        <button
          ref={deleteAccountTrigger}
          className="button is-danger"
          type="button"
          onClick={() => openDialog()}
        >
          Delete account
        </button>
      </div>

      <ConfirmationDialog
        title="Confirm account deletion"
        trigger={deleteAccountTrigger}
        showDanger={true}
        confirmButtonColor="is-danger"
        confirmHandler={() => handleConfirm()}
        cancelHandler={() => closeDialog()}
        isDialogOpen={isDialogOpen}
      >
        <div className={styles['dialog-content']}>
          <span className="">
            <Icon type="solid" name="triangle-exclamation" />
          </span>
          <p>
            You are about to delete your account. Once confirmed, this action
            cannot be undone.
          </p>
        </div>
      </ConfirmationDialog>
    </div>
  );
};
