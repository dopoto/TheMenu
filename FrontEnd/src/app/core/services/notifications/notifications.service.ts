import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Notification } from '../../models/notification';
import { AppState } from '../../store/app.state';
import { selectAuthNotification } from 'src/app/core/store/selectors/user.selectors'; 
import { NotificationTypes } from '../../models/notification-types';
import { AuthActionTypes } from '../../store/actions/_app-action-types';

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
