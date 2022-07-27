import {
  notificationReducer,
  NOTIFICATION_ACTIONS,
} from './notification-reducer';

describe('NotificationReducer', () => {
  const initialState = {
    messages: [],
  };

  it('should return state for `SHOW_NOTIFICATION` type', () => {
    const payload = {
      message: 'message',
      type: 'success',
    };

    const newState = notificationReducer(initialState, {
      type: NOTIFICATION_ACTIONS.SHOW_NOTIFICATION,
      payload,
    });

    expect(newState).toEqual({
      messages: [payload],
    });
  });

  it('should clear state for `CLEAR_NOTIFICATIONS` type', () => {
    const newState = notificationReducer(initialState, {
      type: NOTIFICATION_ACTIONS.CLEAR_NOTIFICATIONS,
    });

    expect(newState).toEqual(initialState);
  });

  it('should return state by default', () => {
    const newState = notificationReducer(initialState, { type: '' });

    expect(newState).toEqual(initialState);
  });
});
