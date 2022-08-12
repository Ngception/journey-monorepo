import { BugError } from '@journey-monorepo/assets';
import { FC } from 'react';

import styles from './Error.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ErrorProps {}

export const Error: FC<ErrorProps> = (props: ErrorProps) => {
  return (
    <div className={styles['error-container']}>
      <div className={`column ${styles['error-content']}`}>
        <BugError height={'450px'} width={'450px'} />
        <h1 className="title">Oops...something went wrong.</h1>
        <p className="subtitle">Please try again by refreshing the page.</p>
        <p className="subtitle">
          If this issue happens again, please contact us.
        </p>
      </div>
    </div>
  );
};
