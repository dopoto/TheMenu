import { createAction, props } from '@ngrx/store';
import { AppState } from '../app.state';

export enum ManagerDemoActionTypes {
    MANAGER_DEMO_STARTED = '[dmo] Started',
    MANAGER_DEMO_SUCCESS = '[dmo] Success'
}

export const managerDemoStart = createAction(
    ManagerDemoActionTypes.MANAGER_DEMO_STARTED,
    props<{ msg: string }>()
);

export const managerDemoSuccess = createAction(
    ManagerDemoActionTypes.MANAGER_DEMO_SUCCESS,
    props<{ demoState: AppState }>()
);