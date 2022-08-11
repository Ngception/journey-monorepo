import { FC, ReactNode } from 'react';

interface MessageBodyProps {
  children: ReactNode;
  testId?: string;
}

export const MessageBody: FC<MessageBodyProps> = (props: MessageBodyProps) => {
  return (
    <div data-testid={props.testId || 'message-body'} className="message-body">
      {props.children}
    </div>
  );
};
