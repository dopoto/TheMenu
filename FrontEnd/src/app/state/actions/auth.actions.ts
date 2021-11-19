import { createAction, props } from '@ngrx/store';

import { ClientSideUser } from 'api/generated-models';
import { AuthActionTypes } from './_app-action-types';

const actionTypes = AuthActionTypes;

export const loginStart = createAction(actionTypes.loginStart);
export const loginOk = createAction(
    actionTypes.loginOk,
    props<{ clientSideUser: ClientSideUser }>()
);
export const loginFail = createAction(
    actionTypes.loginFail,
    props<{ errorMessage: string }>()
);
export const loginError = createAction(
    actionTypes.loginError,
    props<{ errorMessage: string }>()
);

export const logoutStart = createAction(actionTypes.logoutStart);
export const logoutOk = createAction(actionTypes.logoutOk);
export const logoutError = createAction(
    actionTypes.logoutError,
    props<{ errorMessage: string }>()
);


