import { createReducer, on } from '@ngrx/store';

import { DemoState } from '../models/demo-state';

import * as actions from '../actions/demo.actions';

export const initialState: DemoState = {
    simulateCustomersActivity: null,
    simulateServersActivity: null,
};

export const demoReducer = createReducer(
    initialState,
    on(actions.initDemo, (state, { demoSettings }) => ({
        ...state,
        simulateCustomersActivity: demoSettings.simulateCustomersActivity,
        simulateServersActivity: demoSettings.simulateServersActivity,
    })),
);
