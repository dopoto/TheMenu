import { Action, createReducer, on } from '@ngrx/store';

import { AuthState } from '../../models/auth-state';

import * as AuthActions from '../actions/auth.actions';
import { AuthActionTypes } from '../actions/_app-action-types';
 

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    notificationId: null
};

const authReducer = createReducer(
    initialState,

    on(AuthActions.loginStart, () => ({
        isAuthenticated: false,
        user: null,
        notificationId: AuthActionTypes.loginStart
    })),

    on(AuthActions.loginOk, (state, { socialUser }) => ({ 
        isAuthenticated: true,
        user: { ...socialUser },
        notificationId: AuthActionTypes.loginOk
    })),
    
    on(AuthActions.loginFail, () => ({
        isAuthenticated: false,
        user: null,
        notificationId: AuthActionTypes.loginFail
    })),
    
    on(AuthActions.loginError, () => ({
        isAuthenticated: false,
        user: null,
        notificationId: AuthActionTypes.loginError
    })),
    
    on(AuthActions.logoutStart, () => ({
        isAuthenticated: false,
        user: null,
        notificationId: null
    })),

    on(AuthActions.logoutOk, () => ({ 
        isAuthenticated: false,
        user: null,
        notificationId: null
    }))
);

export function reducer(state: AuthState | undefined, action: Action) {
    return authReducer(state, action);
}
