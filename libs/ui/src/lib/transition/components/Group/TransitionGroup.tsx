import { FC, ReactNode } from 'react';
import { TransitionGroup as RTGTransitionGroup } from 'react-transition-group';

interface TransitionGroupProps {
  children: ReactNode;
}

export const TransitionGroup: FC<TransitionGroupProps> = (
  props: TransitionGroupProps
) => {
  return <RTGTransitionGroup>{props.children}</RTGTransitionGroup>;
};
