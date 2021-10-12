import { createAction, props } from '@ngrx/store';
import { SocialUser } from 'angularx-social-login';

export enum AuthActionTypes {
    LOGIN_STARTED = '[Auth] Login Started',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAIL = '[Auth] Login Fail',
    LOGIN_ERROR = '[Auth] Login Error',
    LOGOUT_STARTED = '[Auth] Logout Started',
    LOGOUT_SUCCESS = '[Auth] Logout Success',
    LOGOUT_FAILURE = '[Auth] Logout Failure',
}

export const loginStarted = createAction(AuthActionTypes.LOGIN_STARTED);

export const loginSuccess = createAction(
    AuthActionTypes.LOGIN_SUCCESS,
    props<{ socialUser: SocialUser }>()
);

export const loginFail = createAction(
    AuthActionTypes.LOGIN_FAIL,
    props<{ errorMessage: string }>()
);

export const loginError = createAction(
    AuthActionTypes.LOGIN_ERROR,
    props<{ errorMessage: string }>()
);

export const logoutStarted = createAction(AuthActionTypes.LOGOUT_STARTED);

export const logoutSuccess = createAction(AuthActionTypes.LOGOUT_SUCCESS);

export const logoutFailure = createAction(
    AuthActionTypes.LOGOUT_FAILURE,
    props<{ errorMessage: string }>()
);
