export interface Notification {
  message: string;
  type: 'success' | 'error';
}

export interface NotificationAction {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export interface InitialNotificationStateInterface {
  messages: Notification[];
}

export const NOTIFICATION_ACTIONS = {
  ADD_NOTIFICATION: 'add notification',
  CLEAR_NOTIFICATIONS: 'clear notifications',
};

export const notificationInitialState = {
  messages: [] as Notification[],
};

export const notificationReducer = (
  state = notificationInitialState,
  action: NotificationAction
) => {
  switch (action.type) {
    case NOTIFICATION_ACTIONS.ADD_NOTIFICATION:
      return {
        messages: [...state.messages, action.payload],
      };
    case NOTIFICATION_ACTIONS.CLEAR_NOTIFICATIONS:
      return notificationInitialState;
    default:
      return state;
  }
};
