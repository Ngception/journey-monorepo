export interface UserAction {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export interface InitialUserStateInterface {
  user_id: string;
  email: string;
  created_at: Date;
}

export const USER_ACTIONS = {
  SET_USER: 'set user',
  CLEAR_USER: 'clear user',
};

export const userInitialState = {
  user_id: '',
  email: '',
};

export const userReducer = (state = userInitialState, action: UserAction) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return {
        ...action.payload,
      };
    case USER_ACTIONS.CLEAR_USER:
      return userInitialState;
    default:
      return state;
  }
};
