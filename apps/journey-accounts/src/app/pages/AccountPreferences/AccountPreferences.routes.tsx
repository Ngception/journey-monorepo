import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AccountPreferencesContainer } from './AccountPreferencesContainer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AccountPreferencesRoutesProps {}

export const AccountPreferencesRoutes: FC<AccountPreferencesRoutesProps> = (
  props: AccountPreferencesRoutesProps
) => {
  return (
    <Routes>
      <Route path="/" element={<AccountPreferencesContainer />}></Route>
    </Routes>
  );
};
