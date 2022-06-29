import { FC, useEffect, useState } from 'react';
import { useAuth, useUser } from '../../shared';
import { ProfileDetails } from './components/Details/ProfileDetails';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProfileContainerProps {}

export const ProfileContainer: FC<ProfileContainerProps> = (
  props: ProfileContainerProps
) => {
  const [email, setEmail] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<string>('');

  const { state: auth } = useAuth();
  const { state: user } = useUser();

  useEffect(() => {
    setEmail(user.email);
    setCreatedAt(formatDate(user.created_at));
  }, [auth.isLoggedIn]);

  const formatDate = (date: Date = new Date()) => {
    let dateObject = new Date(date);

    const offset = dateObject.getTimezoneOffset();
    dateObject = new Date(dateObject.getTime() - offset * 60 * 1000);
    return dateObject.toISOString().split('T')[0];
  };

  return (
    <div className="container column is-three-fifths">
      <ProfileDetails email={email} createdAt={createdAt} />
    </div>
  );
};
