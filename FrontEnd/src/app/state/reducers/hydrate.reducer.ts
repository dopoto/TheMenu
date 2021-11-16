// import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

// import { AppState } from '../app.state';

// export const hydrationMetaReducer = (
//     reducer: ActionReducer<AppState>
// ): ActionReducer<AppState> => {
//     return (state, action) => {
//         if (action.type === INIT || action.type === UPDATE) {
//             const storageValue = localStorage.getItem('state');
//             if (storageValue) {
//                 try {
//                     return JSON.parse(storageValue);
//                 } catch {
//                     localStorage.removeItem('state');
//                 }
//             }
//         }
//         const nextState = reducer(state, action);
//         localStorage.setItem('state', JSON.stringify(nextState));
//         return nextState;
//     };
// };

import { Action, ActionReducer } from '@ngrx/store';
import * as HydrationActions from '../actions/hydrate.actions';
import { AppState } from '../app.state';

function isHydrateSuccess(
    action: Action
): action is ReturnType<typeof HydrationActions.hydrateOk> {
    return action.type === HydrationActions.hydrateOk.type;
}

export const hydrateMetaReducer = (
    reducer: ActionReducer<AppState>
): ActionReducer<AppState> => {
    return (state, action) => {
        if (isHydrateSuccess(action)) {
            return action.state;
        } else {
            return reducer(state, action);
        }
    };
};
