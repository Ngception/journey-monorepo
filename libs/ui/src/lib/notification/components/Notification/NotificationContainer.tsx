import { FC, useEffect, useState } from 'react';
import { useNotification } from '../../';
import { NotificationDetails } from './Details/NotificationDetails';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NotificationContainerProps {}

export const NotificationContainer: FC<NotificationContainerProps> = (
  props: NotificationContainerProps
) => {
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const { state } = useNotification();

  useEffect(() => {
    bindNotifications();
  }, [state.messages.length]);

  const bindNotifications = () => {
    if (!state.messages.length) {
      setShowNotifications(false);
      return;
    }

    setShowNotifications(true);
  };

  return (
    <div>
      {showNotifications &&
        state.messages.map((notification, idx) => (
          <NotificationDetails
            key={idx}
            notification={notification}
            index={idx}
          />
        ))}
    </div>
  );
};
