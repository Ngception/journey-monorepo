import { createContext, FC, ReactNode, useReducer } from 'react';
import {
  InitialNotificationStateInterface,
  notificationInitialState,
  notificationReducer,
  NOTIFICATION_ACTIONS,
} from '../reducer/notification-reducer';

export interface INotificationContext {
  state: InitialNotificationStateInterface;
  showSuccessNotification: (message: string) => void;
  showErrorNotification: (message: string) => void;
  showInfoNotification: (message: string) => void;
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
    showSuccessNotification: (message: string) =>
      dispatch({
        type: NOTIFICATION_ACTIONS.SHOW_NOTIFICATION,
        payload: {
          message,
          type: 'success',
        },
      }),
    showErrorNotification: (message: string) =>
      dispatch({
        type: NOTIFICATION_ACTIONS.SHOW_NOTIFICATION,
        payload: {
          message,
          type: 'error',
        },
      }),
    showInfoNotification: (message: string) =>
      dispatch({
        type: NOTIFICATION_ACTIONS.SHOW_NOTIFICATION,
        payload: {
          message,
          type: 'info',
        },
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
