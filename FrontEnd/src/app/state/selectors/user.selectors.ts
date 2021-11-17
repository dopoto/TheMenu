import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../app.state';
import { AuthState } from '../models/auth-state';

// TODO
export const selectAuthState = createFeatureSelector<AppState, AuthState>(
    'auth'
);

export const selectAuthUser = createSelector(
    selectAuthState,
    (state: AuthState) => state?.user
);

export const selectAuthNotification = createSelector(
    selectAuthState,
    (state: AuthState) => state?.notificationId
);

export const selectIsDemo = createSelector(
    selectAuthState,
    (state: AuthState) => state?.isDemo
);
