import { ACTIONS, authReducer } from './auth-reducer';

describe('AuthReducer', () => {
  const initialState = {
    isLoggedIn: false,
  };

  it('should return state for `LOGIN` type', () => {
    const newState = authReducer(initialState, {
      type: ACTIONS.LOGIN,
    });

    expect(newState).toEqual({ isLoggedIn: true });
  });

  it('should return state for `LOGOUT` type', () => {
    const newState = authReducer(initialState, { type: ACTIONS.LOGOUT });

    expect(newState).toEqual(initialState);
  });

  it('should return state by default', () => {
    const newState = authReducer(initialState, { type: '' });

    expect(newState).toEqual(initialState);
  });
});
