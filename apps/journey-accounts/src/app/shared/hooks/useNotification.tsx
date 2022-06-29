import { useContext } from 'react';
import { INotificationContext, NotificationContext } from '../context';

export const useNotification = () => {
  return useContext(NotificationContext) as INotificationContext;
};
