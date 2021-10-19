import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { AuthState } from '../../models/auth-state';
import * as DemoActions from '../actions/demo.actions';
import { AppState } from '../app.state';

export const initialState: AppState = {
    auth: {
        isAuthenticated: false,
        user: null,
        notificationId: null,
    },
};

const demoReducer = createReducer(
    initialState,

    on(DemoActions.demoStart, () => ({
        auth: {
            isAuthenticated: false,
            user: null,
            notificationId: null,
        },
    })),

    on(DemoActions.demoSuccess, (state, { appState }) => ({
        auth: {
            isAuthenticated: true,
            user: { ...appState.auth.user },
            notificationId: null,
        },
    }))

    // on(DemoActions.loginSuccess, (state, { appState }) => ({
    //     isAuthenticated: true,
    //     user: { ...socialUser },
    //     notificationId: DemoActionTypes.loginOk,
    // })),

    // on(DemoActions.loginFail, () => ({
    //     isAuthenticated: false,
    //     user: null,
    //     notificationId: DemoActionTypes.loginFail,
    // })),

    // on(DemoActions.loginError, () => ({
    //     isAuthenticated: false,
    //     user: null,
    //     notificationId: DemoActionTypes.loginError,
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

export function reducer(state: AppState | undefined, action: Action) {
    return demoReducer(state, action);
}

export const demoMetaReducer = (
    reducer: ActionReducer<AppState>
): ActionReducer<AppState> => {
    return (state, action) => {
        return reducer(state, action);
    };
};
