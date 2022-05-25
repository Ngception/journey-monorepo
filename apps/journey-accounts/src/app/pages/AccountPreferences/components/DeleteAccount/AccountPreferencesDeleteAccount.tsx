import { Icon } from '@journey-monorepo/ui';
import { FC } from 'react';

import styles from './AccountPreferencesDeleteAccount.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AccountPreferencesDeleteAccountProps {}

export const AccountPreferencesDeleteAccount: FC<
  AccountPreferencesDeleteAccountProps
> = (props: AccountPreferencesDeleteAccountProps) => {
  const handleClick = () => {
    console.log('delete!');
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
            services, and we permanently delete your personal data. This action
            cannot be undone.
          </p>
        </div>
      </div>
      <div className={styles['actions']}>
        <button
          className="button is-danger"
          type="button"
          onClick={() => handleClick()}
        >
          Delete account
        </button>
      </div>
    </div>
  );
};
