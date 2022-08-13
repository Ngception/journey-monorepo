import { errorReducer, ERROR_ACTIONS } from './error.reducer';

describe('ErrorReducer', () => {
  const initialState = {
    status: 0,
  };

  it('should return state for `SET_ERROR` type', () => {
    const payload = {
      status: 500,
    };

    const newState = errorReducer(initialState, {
      type: ERROR_ACTIONS.SET_ERROR,
      payload,
    });

    expect(newState).toEqual(payload);
  });

  it('should clear state for `CLEAR_ERROR` type', () => {
    const newState = errorReducer(initialState, {
      type: ERROR_ACTIONS.CLEAR_ERROR,
    });

    expect(newState).toEqual(initialState);
  });

  it('should return state by default', () => {
    const newState = errorReducer(initialState, { type: '' });

    expect(newState).toEqual(initialState);
  });
});
