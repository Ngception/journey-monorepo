import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SecurityRoutesProps {}

export const SecurityRoutes: FC<SecurityRoutesProps> = (
  props: SecurityRoutesProps
) => {
  return (
    <Routes>
      <Route path="/" element={<p>Security route works!</p>}></Route>
    </Routes>
  );
};
