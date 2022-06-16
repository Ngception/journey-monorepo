import { userReducer, USER_ACTIONS } from './user-reducer';

describe('UserReducer', () => {
  const initialState = {
    email: '',
    user_id: '',
  };

  it('should return state for `SET_USER` type', () => {
    const payload = {
      email: 'email',
      user_id: 'uuid',
    };

    const newState = userReducer(initialState, {
      type: USER_ACTIONS.SET_USER,
      payload,
    });

    expect(newState).toEqual(payload);
  });

  it('should clear state for `CLEAR_USER` type', () => {
    const newState = userReducer(initialState, {
      type: USER_ACTIONS.CLEAR_USER,
    });

    expect(newState).toEqual(initialState);
  });

  it('should return state by default', () => {
    const newState = userReducer(initialState, { type: '' });

    expect(newState).toEqual(initialState);
  });
});
