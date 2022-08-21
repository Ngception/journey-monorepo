/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, useId } from 'react';
import { motion } from 'framer-motion';
import { setFadeOptions } from '../../../constants';

interface AnimateMotionProps {
  children: ReactNode;
  options?: any;
}

export const AnimateMotion: FC<AnimateMotionProps> = (
  props: AnimateMotionProps
) => {
  const key = `${useId()}-${Math.floor(Math.random() * 100)}`;

  const setDefaultOptions = () => {
    return setFadeOptions(key, 0.25);
  };

  return (
    <motion.div {...(props?.options || setDefaultOptions())}>
      {props.children}
    </motion.div>
  );
};
