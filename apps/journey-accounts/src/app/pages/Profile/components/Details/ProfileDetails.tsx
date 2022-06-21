import { FC, useEffect } from 'react';
import { Icon } from '@journey-monorepo/ui';

import styles from './ProfileDetails.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProfileDetailsProps {
  email: string;
  createdAt: string;
}

export const ProfileDetails: FC<ProfileDetailsProps> = (
  props: ProfileDetailsProps
) => {
  const detailsCardClasses = `card ${styles['details-card']}`;

  return (
    <div>
      <h1>
        <span className={styles['about-icon']}>
          <Icon type="solid" name="user" />
        </span>
        About you{' '}
      </h1>
      <div className={detailsCardClasses}>
        <h2>User: {props.email}</h2>
        <h2>{`Account created on ${props.createdAt}`}</h2>
      </div>
    </div>
  );
};
