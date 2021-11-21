import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions/current-location.actions';
import { CurrentLocationState } from '../models/current-location-state';

export const initialState = {} as CurrentLocationState;

export const currentLocationReducer = createReducer(
    initialState,
    on(actions.addOrderOk, (state, { order }) => ({
        ...state,
        orders: [...state.orders, order],
    }))
);
