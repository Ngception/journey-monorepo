export interface Action {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export interface initialAuthStateType {
  isLoggedIn: boolean;
}

export const ACTIONS = {
  LOGIN: 'login',
  LOGOUT: 'logout',
};

export const authInitialState = {
  isLoggedIn: false,
};

export const authReducer = (state = authInitialState, action: Action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        isLoggedIn: true,
      };
    case ACTIONS.LOGOUT:
      return authInitialState;
    default:
      return state;
  }
};
