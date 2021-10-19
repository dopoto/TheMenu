import { createAction, props } from '@ngrx/store';
import { SocialUser } from 'angularx-social-login';

import { AuthActionTypes } from './_app-action-types';

const actions = AuthActionTypes;

export const loginStart = createAction(AuthActionTypes.loginStart);
export const loginOk = createAction(
    actions.loginOk,
    props<{ socialUser: SocialUser }>()
);
export const loginFail = createAction(
    actions.loginFail,
    props<{ errorMessage: string }>()
);
export const loginError = createAction(
    actions.loginError,
    props<{ errorMessage: string }>()
);

export const logoutStart = createAction(actions.logoutStart);
export const logoutOk = createAction(actions.logoutOk);
export const logoutError = createAction(
    actions.logoutError,
    props<{ errorMessage: string }>()
);
