import { createAction, props } from '@ngrx/store';

import { AppState } from '../app.state';
import { DemoSettings } from '../models/demo-settings';
import { LocationsActionTypes } from './_app-action-types';

const actionTypes = LocationsActionTypes;

// export const initDemo = createAction(
//     actionTypes.initDemo,
//     props<{ demoSettings: DemoSettings }>()
// );
