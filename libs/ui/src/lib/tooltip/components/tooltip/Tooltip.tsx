import { FC, ReactNode } from 'react';
import { COLORS } from '../../../constants';

import styles from './Tooltip.module.scss';

interface TooltipProps {
  color?: string;
  children: ReactNode;
  position: string;
}

export const Tooltip: FC<TooltipProps> = (props: TooltipProps) => {
  const setTooltipClasses = () => {
    let tooltipClasses = `tag ${styles['tooltip']}`;

    if (props.color) {
      tooltipClasses += ` ${COLORS[props.color]}`;
    }

    if (props.position) {
      props.position.split('-').forEach((position) => {
        switch (position) {
          case 'top':
            tooltipClasses += ` ${styles['tooltip-top']}`;
            break;
          case 'bottom':
            tooltipClasses += ` ${styles['tooltip-bottom']}`;
            break;
          case 'left':
            tooltipClasses += ` ${styles['tooltip-left']}`;
            break;
          case 'right':
            tooltipClasses += ` ${styles['tooltip-right']}`;
            break;
          case 'center':
            tooltipClasses += ` ${styles['tooltip-center']}`;
            break;
          default:
            tooltipClasses += ` ${styles['tooltip-top']} ${styles['tooltip-center']}`;
            break;
        }
      });
    }

    return tooltipClasses;
  };

  return <span className={setTooltipClasses()}>{props.children}</span>;
};
