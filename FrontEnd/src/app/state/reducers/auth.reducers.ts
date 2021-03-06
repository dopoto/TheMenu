import { Action, createReducer, on } from '@ngrx/store';
 
import * as AuthActions from '../actions/auth.actions';
import * as DemoActions from '../actions/demo.actions';
import { AuthActionTypes } from '../actions/_app-action-types';
import { AuthState } from '../models/auth-state';

export const initialState: AuthState = {
    isAuthenticated: false,
    isDemo: false,
    user: null,
    notificationId: null
};

export const authReducer = createReducer(
    initialState,

    on(AuthActions.loginStart, () => ({
        isAuthenticated: false,
        isDemo: false,
        user: null,
        notificationId: AuthActionTypes.loginStart
    })),

    on(AuthActions.loginOk, (state, { clientSideUser }) => ({ 
        isAuthenticated: true,
        isDemo: false,
        user: { ...clientSideUser },
        notificationId: AuthActionTypes.loginOk
    })),
    
    on(AuthActions.loginFail, () => ({
        isAuthenticated: false,
        isDemo: false,
        user: null,
        notificationId: AuthActionTypes.loginFail
    })),
    
    on(AuthActions.loginError, () => ({
        isAuthenticated: false,
        isDemo: false,
        user: null,
        notificationId: AuthActionTypes.loginError
    })),
    
    on(AuthActions.logoutStart, () => ({
        isAuthenticated: false,
        isDemo: false,
        user: null,
        notificationId: null
    })),

    on(AuthActions.logoutOk, () => ({ 
        isAuthenticated: false,
        isDemo: false,
        user: null,
        notificationId: null
    })),
    
    on(DemoActions.exitDemoOk, () => ({ 
        isAuthenticated: false,
        isDemo: false,
        user: null,
        notificationId: null
    })),
);