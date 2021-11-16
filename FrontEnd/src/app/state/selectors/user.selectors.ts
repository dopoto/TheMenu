import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from 'src/app/core/models/auth-state';
 
import { AppState } from '../app.state';

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
