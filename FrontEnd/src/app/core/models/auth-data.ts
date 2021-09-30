import { SocialUser } from "angularx-social-login";
import { AuthError } from "./auth-error";
import { AuthState } from "./auth-state";

export interface AuthData {
    state: AuthState;
    data: SocialUser | AuthError | null;
}