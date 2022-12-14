import { FC } from 'react';
import { AnimateMotion, setFadeOptions } from '@journey-monorepo/ui';
import { AccountPreferencesDeleteAccount } from './components/DeleteAccount/AccountPreferencesDeleteAccount';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AccountPreferencesContainerProps {}

export const AccountPreferencesContainer: FC<
  AccountPreferencesContainerProps
> = (props: AccountPreferencesContainerProps) => {
  return (
    <AnimateMotion options={setFadeOptions('account', 0.5)}>
      <div className="container column is-4">
        <div>
          <h1 className="title">Account preferences</h1>
          <p>Control settings related to your account.</p>
        </div>
        <div className="my-5">
          <AccountPreferencesDeleteAccount />
        </div>
      </div>
    </AnimateMotion>
  );
};
