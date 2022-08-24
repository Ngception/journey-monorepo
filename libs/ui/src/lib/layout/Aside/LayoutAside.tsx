import { FC, ReactNode } from 'react';

import styles from './LayoutAside.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LayoutAsideProps {
  children?: ReactNode;
}

export const LayoutAside: FC<LayoutAsideProps> = (props: LayoutAsideProps) => {
  return (
    <div
      className={`layout-aside ${styles['layout-aside']}`}
      data-testid="layout-aside"
    >
      {props.children}
    </div>
  );
};
