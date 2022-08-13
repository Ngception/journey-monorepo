export interface ErrorAction {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export interface InitialErrorStateInterface {
  status: number;
}

export const ERROR_ACTIONS = {
  SET_ERROR: 'set error',
  CLEAR_ERROR: 'clear error',
};

export const errorInitialState = {
  status: 0,
};

export const errorReducer = (
  state = errorInitialState,
  action: ErrorAction
) => {
  switch (action.type) {
    case ERROR_ACTIONS.SET_ERROR:
      return {
        ...action.payload,
      };
    case ERROR_ACTIONS.CLEAR_ERROR:
    default:
      return state;
  }
};
