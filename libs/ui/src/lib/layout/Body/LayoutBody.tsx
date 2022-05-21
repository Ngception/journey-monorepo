import { FC, ReactNode } from 'react';

import styles from './LayoutBody.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LayoutBodyProps {
  children?: ReactNode;
}

export const LayoutBody: FC<LayoutBodyProps> = (props: LayoutBodyProps) => {
  return (
    <div data-testid="layout-body" className={styles['layout-body']}>
      <h2>{props.children}</h2>
    </div>
  );
};
