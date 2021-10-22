import { SocialUser } from "angularx-social-login";

import { AuthActionTypes } from "../store/actions/_app-action-types";

export interface AuthState {
    isAuthenticated: boolean;
    isDemo: boolean;
    user: SocialUser | null;
    notificationId: AuthActionTypes | null;
}