import { Action, createReducer, on } from '@ngrx/store';

import { AuthState } from '../../models/auth-state';
import { AuthActionTypes } from '../actions/auth.actions';
import * as AuthActions from '../actions/auth.actions';
 

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    notificationId: null
};

const authReducer = createReducer(
    initialState,

    on(AuthActions.loginStarted, () => ({
        isAuthenticated: false,
        user: null,
        notificationId: AuthActionTypes.LOGIN_STARTED
    })),

    on(AuthActions.loginSuccess, (state, { socialUser }) => ({ 
        isAuthenticated: true,
        user: { ...socialUser },
        notificationId: AuthActionTypes.LOGIN_SUCCESS
    })),
    
    on(AuthActions.loginFail, () => ({
        isAuthenticated: false,
        user: null,
        notificationId: AuthActionTypes.LOGIN_FAIL
    })),
    
    on(AuthActions.loginError, () => ({
        isAuthenticated: false,
        user: null,
        notificationId: AuthActionTypes.LOGIN_ERROR
    })),
    
    on(AuthActions.logoutStarted, () => ({
        isAuthenticated: false,
        user: null,
        notificationId: null
    })),

    on(AuthActions.logoutSuccess, () => ({ 
        isAuthenticated: false,
        user: null,
        notificationId: null
    }))
);

export function reducer(state: AuthState | undefined, action: Action) {
    return authReducer(state, action);
}
