import { FC, MouseEvent, useEffect } from 'react';
import { useNotification } from '../../../hook/useNotification';
import { INotification } from '../../../reducer/notification.reducer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NotificationDetailsProps {
  notification: INotification;
  index: number;
}

export const NotificationDetails: FC<NotificationDetailsProps> = (
  props: NotificationDetailsProps
) => {
  const { removeNotification } = useNotification();

  useEffect(() => {
    setTimeout(() => {
      removeNotification(props.notification.id);
    }, 5000 + props.index * 1000);
  }, []);

  const getNotificationType = (type: string) => {
    switch (type) {
      case 'success':
        return 'is-success';
      case 'error':
        return 'is-danger';
      case 'info':
        return 'is-info';
      default:
        return 'is-primary';
    }
  };

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();

    removeNotification(props.notification.id);
  };

  return (
    <div
      data-testid="notification-details"
      className={`notification ${getNotificationType(
        props.notification.type
      )} mx-2 my-2`}
    >
      <button
        type="button"
        className="delete"
        aria-label="Delete notification"
        onClick={handleClick}
      ></button>
      <p role="alert">{props.notification.message}</p>
    </div>
  );
};
