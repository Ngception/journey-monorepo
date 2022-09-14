import { FC } from 'react';
import { AnimateMotion, setFadeOptions } from '@journey-monorepo/ui';
import { SecurityEditPassword } from './components';

import styles from './SecurityContainer.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SecurityContainerProps {}

export const SecurityContainer: FC<SecurityContainerProps> = (
  props: SecurityContainerProps
) => {
  return (
    <AnimateMotion options={setFadeOptions('security', 0.5)}>
      <div className={styles['security-container']}>
        <div className="container column is-4 pb-2">
          <h1 className="title">Security</h1>
          <div>
            <SecurityEditPassword />
          </div>
        </div>
      </div>
    </AnimateMotion>
  );
};
