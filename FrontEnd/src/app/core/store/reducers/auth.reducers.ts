import { SocialUser } from 'angularx-social-login';
import { All, AuthActionTypes } from '../actions/user.actions';

export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: SocialUser | null;
    // error message
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
};

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            debugger;
            return {
                ...state,
                isAuthenticated: true,
                user: <SocialUser>{
                    //token: action.payload.token,
                    email: action.payload.email,
                },
                errorMessage: null,
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'Login failed',
            };
        }
        default: {
            return state;
        }
    }
}
