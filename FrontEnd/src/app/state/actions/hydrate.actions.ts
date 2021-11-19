import { createAction, props } from '@ngrx/store';

import { AppState } from '../app.state';
import { HydrateActionTypes } from './_app-action-types';

const actionTypes = HydrateActionTypes;

// Load the app state from local storage:

export const hydrateStart = createAction(actionTypes.hydrateStart);
export const hydrateOk = createAction(
    actionTypes.hydrateOk,
    props<{ state: AppState }>()
);
export const hydrateError = createAction(
    actionTypes.hydrateError,
    props<{ errorMessage: string }>()
);

// Load the app state from demo data:

// export const hydrateManagerDemoStart = createAction(
//     actions.hydrateManagerDemoStart,
//     props<{ simulateServersActivity: boolean, simulateCustomersActivity: boolean }>()
// );
// export const hydrateManagerDemoOk = createAction(
//     actions.hydrateManagerDemoOk,
//     props<{ state: AppState }>()
// );
// export const hydrateManagerDemoError = createAction(
//     actions.hydrateManagerDemoError
// );
