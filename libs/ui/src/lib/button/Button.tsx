import { FC, ReactNode } from 'react';
import { COLORS, SIZES } from '../constants';

interface ButtonProps {
  children: ReactNode;
  description?: string;
  color?: string;
  size?: string;
  outline?: boolean;
  inverted?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  shouldSubmit?: boolean;
  clickHandler: () => void;
}

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const buttonClasses = `button ${
    props.color ? COLORS[props.color] : 'is-primary'
  } ${props.size ? SIZES[props.size] : undefined} ${
    props.outline ? 'is-outline' : 'undefined'
  } ${props.inverted ? 'is-inverted' : undefined} ${
    props.isLoading ? 'is-loading' : undefined
  }`;

  return (
    <button
      data-testid="button"
      className={buttonClasses}
      type={props.shouldSubmit ? 'submit' : 'button'}
      disabled={props.isDisabled}
      onClick={props.clickHandler}
      aria-description={props.description}
    >
      {props.children}
    </button>
  );
};
