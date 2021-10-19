import { Action, createReducer, on } from '@ngrx/store';

import { AuthState } from '../../models/auth-state';
import * as DemoActions from '../actions/demo.actions';
import { AppState } from '../app.state';

export const initialState: AppState = {
    auth: {
        isAuthenticated: false,
        user: null,
        notificationId: null,
    }
};

const demoReducer = createReducer(
    initialState,

    on(DemoActions.DEMO_START_REQUESTED, () => ({
        auth: {
            isAuthenticated: false,
            user: null,
            notificationId: null,
        },
    })),

    on(DemoActions.DEMO_START_SUCCEEDED, (state, { appState }) => ({ 
        auth: {
            isAuthenticated: true,
            user: { ...appState.auth.user },
            notificationId: null
        }        
    })),

    // on(DemoActions.loginSuccess, (state, { appState }) => ({
    //     isAuthenticated: true,
    //     user: { ...socialUser },
    //     notificationId: DemoActionTypes.LOGIN_SUCCESS,
    // })),

    // on(DemoActions.loginFail, () => ({
    //     isAuthenticated: false,
    //     user: null,
    //     notificationId: DemoActionTypes.LOGIN_FAIL,
    // })),

    // on(DemoActions.loginError, () => ({
    //     isAuthenticated: false,
    //     user: null,
    //     notificationId: DemoActionTypes.LOGIN_ERROR,
    // })),

    // on(DemoActions.logoutStarted, () => ({
    //     isAuthenticated: false,
    //     user: null,
    //     notificationId: null,
    // })),

    // on(DemoActions.logoutSuccess, () => ({
    //     isAuthenticated: false,
    //     user: null,
    //     notificationId: null,
    // }))
);

export function reducer(state: AuthState | undefined, action: Action) {
    return demoReducer(state, action);
}
