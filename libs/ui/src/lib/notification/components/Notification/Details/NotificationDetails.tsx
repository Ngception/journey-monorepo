import { FC } from 'react';
import { Notification } from '../../../reducer/notification-reducer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NotificationDetailsProps {
  notification: Notification;
}

export const NotificationDetails: FC<NotificationDetailsProps> = (
  props: NotificationDetailsProps
) => {
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

  const notificationClasses = `notification ${getNotificationType(
    props.notification.type
  )}`;

  return (
    <div data-testid="notification-details" className={notificationClasses}>
      <button
        type="button"
        className="delete"
        aria-label="Delete notification"
      ></button>
      <p>{props.notification.message}</p>
    </div>
  );
};
