import { AuthActionTypes } from "../store/actions/auth.actions";
import { NotificationTypes } from "./notification-types";

export interface Notification {
    triggerAction: AuthActionTypes,
    dismissible: boolean;
    body: string;
    type: NotificationTypes
    // TODO
    date?: Date;
}