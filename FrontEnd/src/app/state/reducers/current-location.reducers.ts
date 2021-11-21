import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions/current-location.actions';
import { CurrentLocationState } from '../models/current-location-state';

export const initialState = {
    menus: [],
    servers: [],
    tables: [],
    orders: [],

} as CurrentLocationState;

export const currentLocationReducer = createReducer(
    initialState,
    on(actions.addOrder, (state, { order }) => ({
        ...state,
        orders: [...state.orders, order],
    }))
);
