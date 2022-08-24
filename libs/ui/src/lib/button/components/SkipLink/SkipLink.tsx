import { FC, ReactNode, useState } from 'react';
import { COLORS } from '../../../constants';

interface SkipLinkProps {
  children: ReactNode;
  color?: string;
  clickHandler: () => void;
}

export const SkipLink: FC<SkipLinkProps> = (props: SkipLinkProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleSkipLink = () => {
    setIsActive(!isActive);
  };

  const skipLinkClasses = `button skip-link ${!isActive ? 'is-sr-only' : ''} ${
    props?.color ? COLORS[props.color] : 'is-primary'
  }`;

  return (
    <button
      data-testid="skip-link"
      className={skipLinkClasses}
      onFocus={toggleSkipLink}
      onBlur={toggleSkipLink}
      onClick={props.clickHandler}
    >
      {props.children}
    </button>
  );
};
