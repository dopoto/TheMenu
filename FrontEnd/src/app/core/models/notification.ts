 
import { AuthActionTypes } from "src/app/state/actions/_app-action-types";
import { NotificationTypes } from "./notification-types";

export interface Notification {
    triggerAction: AuthActionTypes,
    dismissible: boolean;
    body: string;
    type: NotificationTypes
    // TODO
    date?: Date;
}