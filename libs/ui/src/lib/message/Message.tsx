import { FC, ReactNode } from 'react';
import { COLORS, SIZES } from '../constants';

interface MessageProps {
  color: string;
  size?: string;
  testId?: string;
  children: ReactNode;
}

export const Message: FC<MessageProps> = (props: MessageProps) => {
  const setMessageClasses = () => {
    let messageClasses = 'message';

    if (props.color) {
      messageClasses += ` ${COLORS[props.color]}`;
    }

    if (props.size) {
      messageClasses += ` ${SIZES[props.size]}`;
    }

    return messageClasses;
  };

  const messageClasses = setMessageClasses();

  return (
    <article data-testid={props.testId || 'message'} className={messageClasses}>
      {props.children}
    </article>
  );
};
