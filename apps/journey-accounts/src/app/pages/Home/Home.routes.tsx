import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomeContainer } from './HomeContainer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeRoutesProps {}

export const HomeRoutes: FC<HomeRoutesProps> = (props: HomeRoutesProps) => {
  return (
    <Routes>
      <Route path="/*" element={<HomeContainer />}></Route>
      <Route path="*" element={<Navigate to="/" replace={true} />}></Route>
    </Routes>
  );
};
