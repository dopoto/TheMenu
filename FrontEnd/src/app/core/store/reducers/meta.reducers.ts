import { Action, createReducer, on } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { MetaState } from '../../models/meta-state';

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
