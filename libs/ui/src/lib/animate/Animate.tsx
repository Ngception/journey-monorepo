import { AnimatePresence } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface AnimateProps {
  children: ReactNode;
}

export const Animate: FC<AnimateProps> = (props: AnimateProps) => {
  return <AnimatePresence>{props.children}</AnimatePresence>;
};
