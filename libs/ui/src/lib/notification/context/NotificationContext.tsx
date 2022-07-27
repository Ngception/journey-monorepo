import { createContext, FC, ReactNode, useReducer } from 'react';
import {
  InitialNotificationStateInterface,
  Notification,
  notificationInitialState,
  notificationReducer,
  NOTIFICATION_ACTIONS,
} from '../reducer/notification-reducer';

export interface INotificationContext {
  state: InitialNotificationStateInterface;
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
}

export const NotificationContext = createContext<INotificationContext | null>(
  null
);

interface NotificationProviderProps {
  initialState?: InitialNotificationStateInterface;
  children: ReactNode;
}

export const NotificationProvider: FC<NotificationProviderProps> = ({
  initialState,
  children,
}) => {
  const [state, dispatch] = useReducer(
    notificationReducer,
    notificationInitialState
  );

  const value = {
    state: initialState || (state as InitialNotificationStateInterface),
    addNotification: (notification: Notification) =>
      dispatch({
        type: NOTIFICATION_ACTIONS.ADD_NOTIFICATION,
        payload: notification,
      }),
    clearNotifications: () =>
      dispatch({ type: NOTIFICATION_ACTIONS.CLEAR_NOTIFICATIONS }),
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
