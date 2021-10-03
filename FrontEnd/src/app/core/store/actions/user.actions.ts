import { createAction, props } from '@ngrx/store';
import { SocialUser } from 'angularx-social-login';
import { AuthData } from '../../models/auth-data';

export enum AuthActionTypes {
  LOGIN_STARTED = '[Auth] Login Started',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  // TODO Log out
}

export const loginStarted = createAction(AuthActionTypes.LOGIN_STARTED);
export const loginSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ socialUser: SocialUser }>()
);
export const loginFailure = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ errorMessage: string }>()
);
