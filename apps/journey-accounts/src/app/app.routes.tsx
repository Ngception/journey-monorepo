import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AccountPreferencesRoutes } from './pages/AccountPreferences/AccountPreferences.routes';
import { HomeRoutes } from './pages/Home/Home.routes';
import { ProfileRoutes } from './pages/Profile/Profile.routes';
import { SecurityRoutes } from './pages/Security/Security.routes';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppRoutesProps {}

export const AppRoutes: FC<AppRoutesProps> = (props: AppRoutesProps) => {
  // const userId = process.env['NX_TEST_USER_UUID'];
  const userId = null;

  return (
    <Routes>
      {userId ? (
        <>
          <Route path="/profile/*" element={<ProfileRoutes />}></Route>
          <Route path="/security/*" element={<SecurityRoutes />}></Route>
          <Route
            path="/account-preferences/*"
            element={<AccountPreferencesRoutes />}
          ></Route>
          <Route
            path="*"
            element={<Navigate to="/profile" replace={true} />}
          ></Route>
        </>
      ) : (
        <>
          <Route path="/*" element={<HomeRoutes />} />
          <Route path="*" element={<Navigate to="/" replace={true} />}></Route>
        </>
      )}
    </Routes>
  );
};
