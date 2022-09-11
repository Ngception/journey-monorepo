import { FC, ReactNode, RefObject, useState } from 'react';
import { Animate, AnimateMotion } from '../../../animate';
import { COLORS, SIZES, setFadeOptions } from '../../../constants';

import styles from './TooltipButton.module.scss';

export interface TooltipOptions {
  tooltipColor?: string;
  tooltipPosition: string;
  tooltip: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TooltipButtonProps {
  buttonTestId?: string;
  tooltipTestId?: string;
  children: ReactNode;
  description?: string;
  label?: string;
  color?: string;
  size?: string;
  outline?: boolean;
  inverted?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  shouldSubmit?: boolean;
  triggerRef?: RefObject<HTMLButtonElement>;
  fullWidth?: boolean;
  tooltip?: string;
  tooltipColor?: string;
  tooltipSize?: string;
  tooltipPosition: string;
  clickHandler?: () => void;
  eventHandlers?: any;
}

export const TooltipButton: FC<TooltipButtonProps> = (
  props: TooltipButtonProps
) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const setButtonClasses = () => {
    let buttonClasses = 'button';

    if (props.size) {
      buttonClasses += ` ${SIZES[props.size]}`;
    }

    if (props.color) {
      buttonClasses += ` ${COLORS[props.color]}`;
    }

    if (props.outline) {
      buttonClasses += ' is-outlined';
    }

    if (props.inverted) {
      buttonClasses += ' is-inverted';
    }

    if (props.isLoading) {
      buttonClasses += ' is-loading';
    }

    if (props.fullWidth) {
      buttonClasses += ' is-fullwidth';
    }

    return buttonClasses;
  };

  const setTooltipClasses = () => {
    let tooltipClasses = `tag ${styles['button-tooltip']}`;

    if (props.tooltipSize) {
      tooltipClasses += ` ${SIZES[props.tooltipSize]}`;
    }

    if (props.tooltipColor) {
      tooltipClasses += ` ${COLORS[props.tooltipColor]}`;
    }

    if (props.tooltipPosition) {
      props.tooltipPosition.split('-').forEach((position) => {
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

  return (
    <Animate>
      <div className={styles['button-container']}>
        {!props.isDisabled && showTooltip && (
          <AnimateMotion options={setFadeOptions('button-tooltip', 0.25)}>
            <span
              data-testid={props.tooltipTestId || 'tooltip'}
              className={setTooltipClasses()}
            >
              {props.tooltip}
            </span>
          </AnimateMotion>
        )}
        <button
          data-testid={props.buttonTestId || 'button'}
          ref={props.triggerRef || undefined}
          className={setButtonClasses()}
          type={props.shouldSubmit ? 'submit' : 'button'}
          disabled={props.isDisabled}
          onClick={props.clickHandler || undefined}
          aria-description={props.description || undefined}
          aria-label={props.label || undefined}
          onMouseOver={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          {...props.eventHandlers}
        >
          {props.children}
        </button>
      </div>
    </Animate>
  );
};
