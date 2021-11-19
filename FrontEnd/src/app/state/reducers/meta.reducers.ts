import { createReducer } from '@ngrx/store';

import { MetaState } from 'src/app/state/models/meta-state';
import { environment } from 'src/environments/environment';

export const initialState: MetaState = {
    appVersion: environment.version,
    stateVersion: '1',
    initializedOn: new Date(),
};

export const metaReducer = createReducer(
    initialState
);