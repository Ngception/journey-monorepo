import { FC, ReactNode } from 'react';

interface MessageHeaderProps {
  children: ReactNode;
  canBeDeleted?: boolean;
  testId?: string;
  deleteHandler?: () => void;
}

export const MessageHeader: FC<MessageHeaderProps> = (
  props: MessageHeaderProps
) => {
  return (
    <div
      data-testid={props.testId || 'message-header'}
      className="message-header"
    >
      {props.children}
      {props.canBeDeleted && (
        <button
          data-testid="delete-button"
          className="delete"
          aria-label="Delete message"
          onClick={props.deleteHandler}
        ></button>
      )}
    </div>
  );
};
