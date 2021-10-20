import { ActionReducerMap, createReducer, MetaReducer } from '@ngrx/store';

import { AuthState } from '../models/auth-state';
import { MetaState } from '../models/meta-state';
import * as auth from './reducers/auth.reducers';
import * as meta from './reducers/meta.reducers';

import { hydrationMetaReducer } from './reducers/hydration.reducer';

export interface AppState {
    auth: AuthState;
    meta: MetaState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: auth.reducer,
    meta: meta.reducer
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
