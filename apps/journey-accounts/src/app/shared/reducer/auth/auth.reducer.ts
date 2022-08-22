export interface AuthAction {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export interface InitialAuthStateInterface {
  isLoggedIn: boolean;
}

export const AUTH_ACTIONS = {
  LOGIN: 'login',
  LOGOUT: 'logout',
};

export const authInitialState = {
  isLoggedIn: false,
};

export const authReducer = (state = authInitialState, action: AuthAction) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return {
        isLoggedIn: true,
      };
    case AUTH_ACTIONS.LOGOUT:
      return authInitialState;
    default:
      return state;
  }
};
