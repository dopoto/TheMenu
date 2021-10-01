import { Action, createReducer, on } from '@ngrx/store';
import { SocialUser } from 'angularx-social-login';
import * as AuthActions from '../actions/user.actions';

export interface State {
  isAuthenticated: boolean;
  user: SocialUser | null;
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

const authReducer = createReducer(
  initialState,
  //on(AuthActionTypes.LOGIN_STARTED, state => ({ ...state, initialState })),

  on(AuthActions.loginStarted, (state) => ({
    isAuthenticated: false,
    user: null,
    errorMessage: null,
  })),

  on(AuthActions.loginSuccess, (state, { authData }) => ({
    isAuthenticated: true,
    user: authData.user,
    errorMessage: null,
  })),

  on(AuthActions.loginFailure, (state, { errorMessage }) => ({
    isAuthenticated: false,
    user: null,
    errorMessage: errorMessage,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
