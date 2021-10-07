import { createAction, props } from '@ngrx/store';
import { SocialUser } from 'angularx-social-login';

export enum AuthActionTypes {
    LOGIN_STARTED = '[Auth] Login Started',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILURE = '[Auth] Login Failure',
    LOGOUT_STARTED = '[Auth] Logout Started',
    LOGOUT_SUCCESS = '[Auth] Logout Success',
    LOGOUT_FAILURE = '[Auth] Logout Failure',
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

export const logoutStarted = createAction(AuthActionTypes.LOGOUT_STARTED);
export const logoutSuccess = createAction(AuthActionTypes.LOGOUT_SUCCESS);
export const logoutFailure = createAction(
    AuthActionTypes.LOGOUT_FAILURE,
    props<{ errorMessage: string }>()
);
