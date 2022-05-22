import { FC } from 'react';

import styles from './ProfileDetails.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProfileDetailsProps {}

export const ProfileDetails: FC<ProfileDetailsProps> = (
  props: ProfileDetailsProps
) => {
  const detailsCardClasses = `card ${styles['details-card']}`;

  return (
    <div>
      <h1>About you</h1>
      <div className={detailsCardClasses}>
        <h2>User: account@email.com</h2>
        <h2>Account created on 05/21/2022</h2>
      </div>
    </div>
  );
};
