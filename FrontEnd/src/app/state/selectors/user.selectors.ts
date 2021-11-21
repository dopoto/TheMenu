import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '../models/auth-state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

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
