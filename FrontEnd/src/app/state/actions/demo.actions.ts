import { createAction, props } from '@ngrx/store';

import { AppState } from '../app.state';
import { DemoSettings } from '../models/demo-settings';
import { DemoActionTypes } from './_app-action-types';

const actionTypes = DemoActionTypes;

export const initDemo = createAction(
    actionTypes.initDemo,
    props<{ demoSettings: DemoSettings }>()
);

export const initDemoOk = createAction(
    actionTypes.initDemoOk,
    props<{
        demoAppState: AppState;
        demoSettings: DemoSettings;
    }>()
);

export const initDemoError = createAction(actionTypes.initDemoError);

export const exitDemo = createAction(actionTypes.exitDemo);

export const exitDemoOk = createAction(
    actionTypes.exitDemoOk
);

export const exitDemoError = createAction(
    actionTypes.exitDemoError,
    props<{ errorMessage: string }>()
);