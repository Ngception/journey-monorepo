import { FC, ReactNode } from 'react';

import styles from './LayoutHeader.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LayoutHeaderProps {
  children?: ReactNode;
}

export const LayoutHeader: FC<LayoutHeaderProps> = (
  props: LayoutHeaderProps
) => {
  return (
    <div
      className={`layout-header ${styles['layout-header']}`}
      data-testid="layout-header"
    >
      {props.children}
    </div>
  );
};
