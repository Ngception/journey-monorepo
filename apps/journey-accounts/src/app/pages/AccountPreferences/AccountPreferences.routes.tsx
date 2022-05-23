import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AccountPreferencesRoutesProps {}

export const AccountPreferencesRoutes: FC<AccountPreferencesRoutesProps> = (
  props: AccountPreferencesRoutesProps
) => {
  return (
    <Routes>
      <Route path="/" element={<p>Account preferences route works!</p>}></Route>
    </Routes>
  );
};
