import { createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../models/auth-state';

export const selectLocationsState =
    createFeatureSelector<AuthState>('locations');

// export const selectAuthUser = createSelector(
//     selectAuthState,
//     (state: AuthState) => state?.user
// );

// export const selectAuthNotification = createSelector(
//     selectAuthState,
//     (state: AuthState) => state?.notificationId
// );

// export const selectIsDemo = createSelector(
//     selectAuthState,
//     (state: AuthState) => state?.isDemo
// );
