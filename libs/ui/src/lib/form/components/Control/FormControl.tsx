import { FC, ReactNode } from 'react';

interface FormControlProps {
  children: ReactNode;
  testId?: string;
  hasIconsLeft?: boolean;
  hasIconsRight?: boolean;
  isExpanded?: boolean;
}

export const FormControl: FC<FormControlProps> = (props: FormControlProps) => {
  const setControlClasses = (): string => {
    let classes = 'control';

    if (props.hasIconsLeft) {
      classes += ' has-icons-left';
    }

    if (props.hasIconsRight) {
      classes += ' has-icons-right';
    }

    if (props.isExpanded) {
      classes += ' is-expanded';
    }

    return classes;
  };

  return (
    <div data-testid={props.testId} className={setControlClasses()}>
      {props.children}
    </div>
  );
};
