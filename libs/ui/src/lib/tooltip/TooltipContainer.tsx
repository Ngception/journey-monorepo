import { FC, ReactNode } from 'react';

import styles from './TooltipContainer.module.scss';

interface TooltipContainerProps {
  children: ReactNode;
}

export const TooltipContainer: FC<TooltipContainerProps> = (
  props: TooltipContainerProps
) => {
  return <div className={styles['tooltip-container']}>{props.children}</div>;
};
