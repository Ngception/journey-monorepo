import { FC } from 'react';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IconProps {
  type: 'regular' | 'solid';
  name: IconName;
}

export const Icon: FC<IconProps> = (props: IconProps) => {
  const iconType = props.type === 'regular' ? 'far' : 'fas';

  return <FontAwesomeIcon icon={[iconType, props.name]} />;
};
