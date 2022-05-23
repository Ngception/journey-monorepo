import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProfileContainer } from './ProfileContainer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProfileRoutesProps {}

export const ProfileRoutes: FC<ProfileRoutesProps> = (
  props: ProfileRoutesProps
) => {
  return (
    <Routes>
      <Route path="/" element={<ProfileContainer />}></Route>
    </Routes>
  );
};
