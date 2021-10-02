import { Action, createReducer, on } from '@ngrx/store';
import { SocialUser } from 'angularx-social-login';
import * as AuthActions from '../actions/user.actions';

export interface State {
    isAuthenticated: boolean;
    user: SocialUser | null;
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
};

const authReducer = createReducer(
    initialState,

    on(AuthActions.loginStarted, (state) => ({
        isAuthenticated: false,
        user: null,
        errorMessage: 'by loginstarted reducer',
    })),

    on(AuthActions.loginSuccess, (state, { socialUser }) => ({ 
        ...state,
        user: { ...socialUser }
    })),
    
    
    // => {
    //     debugger;
    //     return {
    //         isAuthenticated: true,
    //         user: socialUser,
    //         errorMessage: 'by loginsuccess reducer',
    //     };
    // }),

    on(AuthActions.loginFailure, (state, { errorMessage }) => ({
        isAuthenticated: false,
        user: null,
        errorMessage: 'by loginfailure reducer',
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return authReducer(state, action);
}
