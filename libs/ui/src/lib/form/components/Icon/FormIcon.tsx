import { FC, ReactNode } from 'react';
import { POSITIONS, SIZES, TEXT_COLORS } from '../../../constants';

interface FormIconProps {
  children: ReactNode;
  size?: string;
  position?: string;
  color?: string;
}

export const FormIcon: FC<FormIconProps> = (props: FormIconProps) => {
  const setIconClasses = (): string => {
    let classes = 'icon';

    if (props.size) {
      classes += ` ${SIZES[props.size]}`;
    }

    if (props.position) {
      classes += ` ${POSITIONS[props.position]}`;
    }

    if (props.color) {
      classes += ` ${TEXT_COLORS[props.color]}`;
    }

    return classes;
  };

  return <span className={setIconClasses()}>{props.children}</span>;
};
