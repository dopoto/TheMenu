import { Action, createReducer, on } from '@ngrx/store';

import { MetaState } from 'src/app/core/models/meta-state';
import { environment } from 'src/environments/environment';

export const initialState: MetaState = {
    appVersion: environment.version,
    stateVersion: '1',
    initializedOn: new Date(),
};

const metaReducer = createReducer(
    initialState
);

export function reducer(state: MetaState | undefined, action: Action) {
    return metaReducer(state, action);
}
