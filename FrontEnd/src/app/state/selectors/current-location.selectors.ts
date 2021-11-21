import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderStatusTypes } from 'src/app/core/models/order-status-types';
import { CurrentLocationState } from '../models/current-location-state';

export const selectCurrentLocationState =
    createFeatureSelector<CurrentLocationState>('currentLocation');

export const selectMenus = createSelector(
    selectCurrentLocationState,
    (state: CurrentLocationState) => state?.menus
);

export const selectActiveOrders = createSelector(
    selectCurrentLocationState,
    (state: CurrentLocationState) =>
        state?.orders?.filter((o) => o.status !== OrderStatusTypes.closed)
);

// export const selectAuthNotification = createSelector(
//     selectAuthState,
//     (state: AuthState) => state?.notificationId
// );

// export const selectIsDemo = createSelector(
//     selectAuthState,
//     (state: AuthState) => state?.isDemo
// );
