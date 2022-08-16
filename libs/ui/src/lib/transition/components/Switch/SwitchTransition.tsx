import { FC, ReactElement } from 'react';
import { SwitchTransition as RTGSwitchTransition } from 'react-transition-group';

interface SwitchTransitionProps {
  children: ReactElement;
}

export const SwitchTransition: FC<SwitchTransitionProps> = (
  props: SwitchTransitionProps
) => {
  return <RTGSwitchTransition>{props.children}</RTGSwitchTransition>;
};
