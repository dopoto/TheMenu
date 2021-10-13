import { SocialUser } from "angularx-social-login";
import { Notification } from "./notification";

export interface AuthState {
    isAuthenticated: boolean;
    user: SocialUser | null;
    notification: Notification | null;
}