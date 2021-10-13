import { Action, createReducer, on } from '@ngrx/store';

import { AuthState } from '../../models/auth-state';
import { NotificationTypes } from '../../models/notification-types';
import * as AuthActions from '../actions/auth.actions';

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    notification: null
};

const authReducer = createReducer(
    initialState,

    on(AuthActions.loginStarted, () => ({
        isAuthenticated: false,
        user: null,
        notification: {
            body: 'Use the Google pop-up to login', //TODO localize
            type: NotificationTypes.info,
            dismissible: true
        }
    })),

    on(AuthActions.loginSuccess, (state, { socialUser }) => ({ 
        isAuthenticated: true,
        user: { ...socialUser },
        notification: null
    })),
    
    on(AuthActions.loginFail, () => ({
        isAuthenticated: false,
        user: null,
        notification: {
            body: 'Login failed', //TODO localize
            type: NotificationTypes.danger,
            dismissible: true
        }
    })),
    
    on(AuthActions.loginError, () => ({
        isAuthenticated: false,
        user: null,
        notification: {
            body: 'An error occured while logging you in. Please try again later', //TODO localize
            type: NotificationTypes.danger,
            dismissible: true
        }
    })),
    
    on(AuthActions.logoutStarted, () => ({
        isAuthenticated: false,
        user: null,
        notification: null
    })),

    on(AuthActions.logoutSuccess, () => ({ 
        isAuthenticated: false,
        user: null,
        notification: null
    }))
);

export function reducer(state: AuthState | undefined, action: Action) {
    return authReducer(state, action);
}
