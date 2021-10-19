import { createAction, props } from '@ngrx/store';

import { AppState } from '../app.state';

export enum HydrateActionTypes {
    HYDRATE_MANAGER_DEMO = '[hydrate] Manager Demo',
};

export const hydrate = createAction('[Hydration] Hydrate');

export const hydrateManagerDemo = createAction(HydrateActionTypes.HYDRATE_MANAGER_DEMO);

export const hydrateSuccess = createAction(
    '[Hydration] Hydrate Success',
    props<{ state: AppState }>()
);

export const hydrateFailure = createAction('[Hydration] Hydrate Failure');