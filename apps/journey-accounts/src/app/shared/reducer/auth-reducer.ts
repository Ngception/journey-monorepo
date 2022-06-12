export interface Action {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export interface initialAuthStateType {
  access_token: string;
  isLoggedIn: boolean;
}

export const ACTIONS = {
  LOGIN: 'login',
  LOGOUT: 'logout',
};

export const authInitialState = {
  access_token: '',
  isLoggedIn: false,
};

export const authReducer = (state = authInitialState, action: Action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        access_token: action.payload,
        isLoggedIn: true,
      };
    case ACTIONS.LOGOUT:
      return authInitialState;
    default:
      return state;
  }
};
