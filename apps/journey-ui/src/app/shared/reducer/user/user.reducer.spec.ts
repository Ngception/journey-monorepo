import { userReducer, USER_ACTIONS } from './user.reducer';

describe('userReducer', () => {
  const initialState = {
    user_id: '',
    email: '',
    created_at: new Date(),
  };

  it('should return state for `SET_USER` type', () => {
    const payload = {
      user_id: 'uuid',
      email: 'email',
      created_at: new Date(),
    };

    const newState = userReducer(initialState, {
      type: USER_ACTIONS.SET_USER,
      payload,
    });

    expect(newState).toEqual(payload);
  });

  it('should return state for `CLEAR_USER` type', () => {
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
