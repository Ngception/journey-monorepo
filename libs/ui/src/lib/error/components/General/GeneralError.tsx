import { FC } from 'react';
import { BugError } from '@journey-monorepo/assets';

import styles from './GeneralError.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralErrorProps {}

export const GeneralError: FC<GeneralErrorProps> = (
  props: GeneralErrorProps
) => {
  return (
    <div className={styles['error-container']}>
      <div className={`column ${styles['error-content']}`}>
        <BugError height={'450px'} width={'450px'} />
        <div role="alert">
          <h1 className="title">Oops...something went wrong.</h1>
          <p className="subtitle">Please try again by refreshing the page.</p>
          <p className="subtitle">
            If this issue happens again, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
};
