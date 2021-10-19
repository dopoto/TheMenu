import { createAction, props } from '@ngrx/store';
import { AppState } from '../app.state';

export enum DemoActionTypes {
    DEMO_START_REQUESTED = 'DEMO_START_REQUESTED',
    DEMO_START_SUCCEEDED = 'DEMO_START_SUCCEEDED',
    DEMO_START_ERRORED = 'DEMO_START_ERRORED',
    DEMO_EXIT_REQUESTED = 'DEMO_EXIT_REQUESTED',
    DEMO_EXIT_SUCCEEDED = 'DEMO_EXIT_SUCCEEDED',
    DEMO_EXIT_ERRORED = 'DEMO_EXIT_ERRORED',
}

export const DEMO_START_REQUESTED = createAction(
    DemoActionTypes.DEMO_START_REQUESTED
);

export const DEMO_START_SUCCEEDED = createAction(
    DemoActionTypes.DEMO_START_SUCCEEDED,
    props<{ appState: AppState }>()
);

export const DEMO_START_ERRORED = createAction(
    DemoActionTypes.DEMO_START_ERRORED,
    props<{ errorMessage: string }>()
);

export const DEMO_EXIT_REQUESTED = createAction(
    DemoActionTypes.DEMO_EXIT_REQUESTED
);

export const DEMO_EXIT_SUCCEEDED = createAction(
    DemoActionTypes.DEMO_EXIT_SUCCEEDED
);

export const DEMO_EXIT_ERRORED = createAction(DemoActionTypes.DEMO_EXIT_ERRORED);

// export const demoSuccess = createAction(
//     DemoActionTypes.DEMO_SUCCESS,
//     props<{ socialUser: SocialUser }>()
// );

// export const demoFail = createAction(
//     DemoActionTypes.DEMO_FAIL,
//     props<{ errorMessage: string }>()
// );

// export const demoError = createAction(
//     DemoActionTypes.DEMO_ERROR,
//     props<{ errorMessage: string }>()
// );

// export const logoutStarted = createAction(DemoActionTypes.LOGOUT_STARTED);

// export const logoutSuccess = createAction(DemoActionTypes.LOGOUT_SUCCESS);

// export const logoutFailure = createAction(
//     DemoActionTypes.LOGOUT_FAILURE,
//     props<{ errorMessage: string }>()
// );
