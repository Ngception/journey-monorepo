import { FC, useEffect, useState } from 'react';
import { useNotification } from '../..';
import { setFadeOptions } from '../../../constants';
import { Animate, AnimateMotion } from '../../../animate';
import { NotificationDetails } from './Details/NotificationDetails';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NotificationProps {}

export const Notification: FC<NotificationProps> = (
  props: NotificationProps
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
      <Animate>
        {showNotifications &&
          state.messages.map((notification, idx) => (
            <AnimateMotion options={setFadeOptions(idx)} key={notification.id}>
              <NotificationDetails notification={notification} index={idx} />
            </AnimateMotion>
          ))}
      </Animate>
    </div>
  );
};
