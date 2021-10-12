import { Action, createReducer, on } from '@ngrx/store';

import { AuthState } from '../../models/auth-state';
import * as AuthActions from '../actions/auth.actions';

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
};

const authReducer = createReducer(
    initialState,

    on(AuthActions.loginStarted, (state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
        errorMessage: '',
    })),

    on(AuthActions.loginSuccess, (state, { socialUser }) => ({ 
        ...state,
        isAuthenticated: true,
        user: { ...socialUser },
        errorMessage: '',
    })),
    
    on(AuthActions.loginFail, (state, { errorMessage }) => ({
        ...state,
        isAuthenticated: false,
        user: null,
        errorMessage,
    })),
    
    on(AuthActions.loginError, (state, { errorMessage }) => ({
        ...state,
        isAuthenticated: false,
        user: null,
        errorMessage,
    })),
    
    on(AuthActions.logoutStarted, () => ({
        isAuthenticated: false,
        user: null,
        errorMessage: 'by logoutStarted reducer',
    })),

    on(AuthActions.logoutSuccess, (state) => ({ 
        ...state,
        user: null,
        errorMessage: ''
    }))
);

export function reducer(state: AuthState | undefined, action: Action) {
    return authReducer(state, action);
}
