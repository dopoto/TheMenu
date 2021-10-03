import { ActionReducerMap } from '@ngrx/store';

import { AuthState } from '../models/auth-state';
import * as auth from './reducers/auth.reducers';

export interface AppState {
    auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: auth.reducer,
};
