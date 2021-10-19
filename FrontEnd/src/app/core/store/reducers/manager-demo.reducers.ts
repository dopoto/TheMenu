import { Action, createReducer, on } from '@ngrx/store';

import { AuthState } from '../../models/auth-state';
import { AuthActionTypes } from '../actions/auth.actions';
import * as ManagerDemoActions from '../actions/manager-demo.actions';
import { AppState } from '../app.state';

export const initialState: AppState = {
    auth: {
        isAuthenticated: false,
        user: null,
        notificationId: null,
    },
};

const managerDemoReducer = createReducer(
    initialState,

    on(ManagerDemoActions.managerDemoStart, () => ({
        auth: {
            isAuthenticated: false,
            user: null,
            notificationId: null,
        },
    })),

    on(ManagerDemoActions.managerDemoSuccess, (state, { demoState }) => ({
        auth: {
            isAuthenticated: false,
            user: demoState.auth.user,
            notificationId: null,
        },
    })),
);

export function reducer(state: AppState | undefined, action: Action) {
    return managerDemoReducer(state, action);
}
