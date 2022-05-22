import { FC } from 'react';
import { ProfileDetails } from './components/Details/ProfileDetails';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProfileContainerProps {}

export const ProfileContainer: FC<ProfileContainerProps> = (
  props: ProfileContainerProps
) => {
  return (
    <div className="container column is-three-fifths">
      <ProfileDetails />
    </div>
  );
};
