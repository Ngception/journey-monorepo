import { FC, useEffect, useState } from 'react';
import { useNotification, Notification } from '../../';
import { NotificationDetails } from './Details/NotificationDetails';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NotificationContainerProps {}

export const NotificationContainer: FC<NotificationContainerProps> = (
  props: NotificationContainerProps
) => {
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>(
    [] as Notification[]
  );
  const { state, clearNotifications } = useNotification();

  useEffect(() => {
    bindNotifications();
    cleanupNotifications();
  }, [state.messages]);

  const bindNotifications = () => {
    if (!state.messages.length) {
      return;
    }

    setNotifications(state.messages);
    setShowNotifications(true);
  };

  const cleanupNotifications = () => {
    setTimeout(() => {
      if (!state.messages.length) {
        return;
      }

      setShowNotifications(false);
      clearNotifications();
    }, 5000);
  };

  return (
    <div>
      {showNotifications &&
        notifications.map((notification, idx) => (
          <NotificationDetails key={idx} notification={notification} />
        ))}
    </div>
  );
};
