import { FC, ReactNode, RefObject } from 'react';
import { COLORS, SIZES } from '../constants';

interface ButtonProps {
  testId?: string;
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
  clickHandler?: () => void;
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const setButtonClasses = () => {
    let buttonClasses = 'button';

    if (props.size) {
      buttonClasses += ` ${SIZES[props.size]}`;
    }

    if (props.color) {
      buttonClasses += ` ${COLORS[props.color]}`;
    }

    if (props.outline) {
      buttonClasses += ' is-outline';
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

  const buttonClasses = setButtonClasses();

  return (
    <button
      data-testid={props.testId || 'button'}
      ref={props.triggerRef || undefined}
      className={buttonClasses}
      type={props.shouldSubmit ? 'submit' : 'button'}
      disabled={props.isDisabled}
      onClick={props.clickHandler || undefined}
      aria-description={props.description || undefined}
      aria-label={props.label || undefined}
    >
      {props.children}
    </button>
  );
};
