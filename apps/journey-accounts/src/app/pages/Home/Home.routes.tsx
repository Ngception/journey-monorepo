import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomeAuthGuard } from '../../components/Auth/HomeAuthGuard';
import { HomeLogin } from './components/Login/HomeLogin';
import { HomeRequestPasswordReset } from './components/RequestPasswordReset/HomeRequestPasswordReset';
import { HomeRegistration } from './components/Registration/HomeRegistration';
import { HomeContainer } from './HomeContainer';
import { HomeResetPassword } from './components/ResetPassword/HomeResetPassword';
import { Animate } from '@journey-monorepo/ui';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeRoutesProps {}

export const HomeRoutes: FC<HomeRoutesProps> = (props: HomeRoutesProps) => {
  return (
    <Routes>
      <Route
        element={
          <Animate>
            <HomeContainer />
          </Animate>
        }
      >
        <Route element={<HomeAuthGuard />}>
          <Route path="login" element={<HomeLogin />} />
          <Route
            path="login/forgot-password"
            element={<HomeRequestPasswordReset />}
          />
          <Route path="login/reset-password" element={<HomeResetPassword />} />
          <Route path="register" element={<HomeRegistration />}></Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace={true} />}></Route>
    </Routes>
  );
};
