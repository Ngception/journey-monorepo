import { FC } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AccountPreferencesRoutes } from './pages/AccountPreferences/AccountPreferences.routes';
import { HomeRoutes } from './pages/Home/Home.routes';
import { ProfileRoutes } from './pages/Profile/Profile.routes';
import { SecurityRoutes } from './pages/Security/Security.routes';
import { AuthGuard } from './components/Auth/AuthGuard';
import { Animate, ErrorOutlet, LayoutContainer } from '@journey-monorepo/ui';
import { AsideNavbar } from './components/Nav/Aside/AsideNavbar';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppRoutesProps {}

export const AppRoutes: FC<AppRoutesProps> = (props: AppRoutesProps) => {
  return (
    <Routes>
      <Route element={<ErrorOutlet />}>
        <Route element={<AuthGuard />}>
          <Route
            element={
              <LayoutContainer
                aside={<AsideNavbar />}
                body={
                  <Animate>
                    <Outlet></Outlet>
                  </Animate>
                }
              />
            }
          >
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
          </Route>
        </Route>
      </Route>

      <Route path="/" element={<HomeRoutes />} />
      <Route path="*" element={<Navigate to="/" replace={true} />}></Route>
    </Routes>
  );
};
