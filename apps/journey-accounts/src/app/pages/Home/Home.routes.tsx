import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomeLogin } from './components/Login/HomeLogin';
import { HomeRegistration } from './components/Registration/HomeRegistration';
import { HomeContainer } from './HomeContainer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeRoutesProps {}

export const HomeRoutes: FC<HomeRoutesProps> = (props: HomeRoutesProps) => {
  return (
    <Routes>
      <Route element={<HomeContainer />}>
        <Route path="/login/*" element={<HomeLogin />}></Route>
        <Route path="/register/*" element={<HomeRegistration />}></Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace={true} />}></Route>
    </Routes>
  );
};
