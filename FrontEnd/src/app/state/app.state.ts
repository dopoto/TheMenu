import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { AuthState } from './models/auth-state';
import { MetaState } from './models/meta-state';
import { DemoState } from './models/demo-state';
import { authReducer } from './reducers/auth.reducers';
import { metaReducer } from './reducers/meta.reducers';
import { demoReducer } from './reducers/demo.reducers';
import { hydrateMetaReducer } from './reducers/hydrate.reducer';
import { debugMetaReducer } from './reducers/debug.meta.reducer';
import { locationsReducer } from './reducers/locations.reducers';
import { LocationsState } from './models/locations-state';
import { CurrentLocationState } from './models/current-location-state';
import { currentLocationReducer } from './reducers/current-location.reducers';

export interface AppState {
    auth: AuthState;
    meta: MetaState;
    demo: DemoState;
    locations: LocationsState;
    currentLocation: CurrentLocationState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    meta: metaReducer,
    demo: demoReducer,
    locations: locationsReducer,
    currentLocation: currentLocationReducer
};

export const metaReducers: MetaReducer[] = [hydrateMetaReducer, debugMetaReducer];
