import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions/demo.actions';
import { LocationsState } from '../models/locations-state';

export const initialState: LocationsState = {
    
};

export const locationsReducer = createReducer(
    initialState,
    // on(actions.initDemo, (state, { demoSettings }) => ({
    //     ...state,
    //     simulateCustomersActivity: demoSettings.simulateCustomersActivity,
    //     simulateServersActivity: demoSettings.simulateServersActivity,
    // })),
);
