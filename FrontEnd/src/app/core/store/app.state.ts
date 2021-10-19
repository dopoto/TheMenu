import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { AuthState } from '../models/auth-state';
import * as auth from './reducers/auth.reducers';
import { demoMetaReducer } from './reducers/demo.reducers';
import { hydrationMetaReducer } from './reducers/hydration.reducer';

export interface AppState {
    auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: auth.reducer
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
