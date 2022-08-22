export interface INotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface NotificationAction {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export interface InitialNotificationStateInterface {
  messages: INotification[];
}

export const NOTIFICATION_ACTIONS = {
  SHOW_NOTIFICATION: 'show notification',
  REMOVE_NOTIFICATION: 'remove notification',
  CLEAR_NOTIFICATIONS: 'clear notifications',
};

export const notificationInitialState = {
  messages: [] as INotification[],
};

export const notificationReducer = (
  state = notificationInitialState,
  action: NotificationAction
) => {
  switch (action.type) {
    case NOTIFICATION_ACTIONS.SHOW_NOTIFICATION:
      if (state.messages.length > 5) {
        return {
          messages: [...state.messages.slice(4), action.payload],
        };
      } else {
        return {
          messages: [...state.messages, action.payload],
        };
      }

    case NOTIFICATION_ACTIONS.REMOVE_NOTIFICATION:
      return {
        messages: [
          ...state.messages.filter((message) => message.id !== action.payload),
        ],
      };
    case NOTIFICATION_ACTIONS.CLEAR_NOTIFICATIONS:
      return notificationInitialState;
    default:
      return state;
  }
};
