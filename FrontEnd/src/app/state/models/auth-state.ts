import { ClientSideUser } from "api/generated-models";
import { AuthActionTypes } from "src/app/state/actions/_app-action-types";

export interface AuthState {
    isAuthenticated: boolean;
    isDemo: boolean;
    user: ClientSideUser | null;
    notificationId: AuthActionTypes | null;
}