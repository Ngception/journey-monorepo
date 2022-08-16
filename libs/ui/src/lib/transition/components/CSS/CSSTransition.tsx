import { FC, ReactNode } from 'react';
import { CSSTransition as RTGCSSTransition } from 'react-transition-group';

interface ClassNames {
  enter: string;
  enterActive: string;
  exit: string;
  exitActive: string;
}

interface CSSTransitionProps {
  children: ReactNode;
  shouldTransition: boolean;
  duration?: number;
  classNames: ClassNames;
}

export const CSSTransition: FC<CSSTransitionProps> = (
  props: CSSTransitionProps
) => {
  return (
    <RTGCSSTransition
      in={props.shouldTransition}
      timeout={props.duration || 200}
      classNames={props.classNames}
    >
      {props.children}
    </RTGCSSTransition>
  );
};
