import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

import { AuthActionTypes } from 'src/app/state/actions/_app-action-types';
import { AppState } from 'src/app/state/app.state';
import { selectAuthNotification } from 'src/app/state/selectors/user.selectors';
import { Notification } from '../../models/notification';
import { NotificationTypes } from '../../models/notification-types';
 

@Injectable({
    providedIn: 'root',
})
export class NotificationsService {
    constructor(private readonly store: Store<AppState>) {
        //TODO unsubscribe
        this.store.pipe(select(selectAuthNotification)).subscribe((result) => {
            const matchingNotification = this.notifications.find(
                (_) => _.triggerAction === result
            );
            // Let's only show one notification at a time for nowL
            const visibleNotifications = matchingNotification
                ? [matchingNotification]
                : [];
            this.visibleNotifications$.next(visibleNotifications);
        });
    }

    getVisibleNotifications$(): Observable<Notification[]> {
        return this.visibleNotifications$;
    }

    private notifications: Notification[] = [
        {
            triggerAction: AuthActionTypes.loginStart,
            body: 'Use the <strong>Google</strong> pop-up to login!', //TODO localize
            type: NotificationTypes.info,
            dismissible: true,
        },
        {
            triggerAction: AuthActionTypes.loginFail,
            body: 'Login failed!', //TODO localize
            type: NotificationTypes.danger,
            dismissible: true,
        },
        {
            triggerAction: AuthActionTypes.loginError,
            body: 'An <strong>error</strong> occured while logging you in. Please try again later!', //TODO localize
            type: NotificationTypes.danger,
            dismissible: true,
        },
    ];
    private visibleNotifications$: BehaviorSubject<Notification[]> =
        new BehaviorSubject([]);
}
