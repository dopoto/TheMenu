import { NotificationTypes } from "./notification-types";

export interface Notification {
    dismissible: boolean;
    body: string;
    type: NotificationTypes
    // TODO
    date?: Date;
}