import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { AuthState } from './models/auth-state';
import { MetaState } from './models/meta-state';
import { DemoState } from './models/demo-state';
import { authReducer } from './reducers/auth.reducers';
import { metaReducer } from './reducers/meta.reducers';
import { demoReducer } from './reducers/demo.reducers';
import { hydrateMetaReducer } from './reducers/hydrate.reducer';
import { debugMetaReducer } from './reducers/debug.meta.reducer';

export interface AppState {
    auth: AuthState;
    meta: MetaState;
    demo: DemoState
}

export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    meta: metaReducer,
    demo: demoReducer
};

export const metaReducers: MetaReducer[] = [hydrateMetaReducer, debugMetaReducer];
