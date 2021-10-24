import { SocialUser } from "angularx-social-login";
import { ClientSideUser } from "api/generated-models";

import { AuthActionTypes } from "../store/actions/_app-action-types";

export interface AuthState {
    isAuthenticated: boolean;
    isDemo: boolean;
    user: ClientSideUser | null;
    notificationId: AuthActionTypes | null;
}