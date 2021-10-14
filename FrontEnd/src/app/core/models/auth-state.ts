import { SocialUser } from "angularx-social-login";
import { AuthActionTypes } from "../store/actions/auth.actions";

export interface AuthState {
    isAuthenticated: boolean;
    user: SocialUser | null;
    notificationId: AuthActionTypes | null;
}