import { useContext } from 'react';
import {
  INotificationContext,
  NotificationContext,
} from '../context/NotificationContext';

export const useNotification = () => {
  return useContext(NotificationContext) as INotificationContext;
};
