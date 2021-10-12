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

    on(AuthActions.loginStarted, () => ({
        isAuthenticated: false,
        user: null,
        errorMessage: 'by loginstarted reducer',
    })),

    on(AuthActions.loginSuccess, (state, { socialUser }) => ({ 
        ...state,
        user: { ...socialUser }
    })),
    
    on(AuthActions.loginFailure, () => ({
        isAuthenticated: false,
        user: null,
        errorMessage: 'by loginfailure reducer',
    })),
    
    on(AuthActions.logoutStarted, () => ({
        isAuthenticated: false,
        user: null,
        errorMessage: 'by logoutStarted reducer',
    })),

    on(AuthActions.logoutSuccess, (state) => ({ 
        ...state,
        user: null
    })),
    
    on(AuthActions.loginFailure, () => ({
        isAuthenticated: false,
        user: null, //TODO ???
        errorMessage: 'by logoutfailure reducer',
    }))
);

export function reducer(state: AuthState | undefined, action: Action) {
    return authReducer(state, action);
}
