import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SecurityContainer } from './SecurityContainer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SecurityRoutesProps {}

export const SecurityRoutes: FC<SecurityRoutesProps> = (
  props: SecurityRoutesProps
) => {
  return (
    <Routes>
      <Route path="/" element={<SecurityContainer />}></Route>
    </Routes>
  );
};
