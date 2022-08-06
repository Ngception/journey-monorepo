import { FC } from 'react';
import { Card, CardContent, Icon } from '@journey-monorepo/ui';

import styles from './ProfileDetails.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProfileDetailsProps {
  email: string;
  createdAt: string;
}

export const ProfileDetails: FC<ProfileDetailsProps> = (
  props: ProfileDetailsProps
) => {
  return (
    <div className={styles['profile-details']}>
      <Card>
        <CardContent>
          <>
            <h2>
              <span className={styles['profile-icons']}>
                <Icon type="solid" name="envelope" />
              </span>
              Email
            </h2>
            <p className="">{props.email}</p>
          </>
        </CardContent>
        <CardContent>
          <h2>
            <span className={styles['profile-icons']}>
              <Icon type="solid" name="calendar" />
            </span>
            Account created
          </h2>
          <p>{props.createdAt}</p>
        </CardContent>
      </Card>
    </div>
  );
};
