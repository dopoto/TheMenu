import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Notification } from '../../models/notification';
import { AppState } from '../../store/app.state';
import { selectAuthNotification } from 'src/app/core/store/selectors/user.selectors';

@Injectable({
    providedIn: 'root',
})
export class NotificationsService {
    private notifications: Notification[] = [];
    private visibleNotifications$: BehaviorSubject<Notification[]> = new BehaviorSubject([]);

    constructor(private readonly store: Store<AppState>) {
        //TODO unsubscribe
        this.store.pipe(select(selectAuthNotification)).subscribe((result) => {
            if(result) {
                // TODO trim / limit to x items?
                this.notifications.push(result);
                const visibleNotifications = this.notifications.length > 0 ? [this.notifications.pop()]: [];
                this.visibleNotifications$.next(visibleNotifications);
            }
            else{
                this.visibleNotifications$.next([]);
            }
        });
    }

    getVisibleNotifications$(): Observable<Notification[]> {        
        return this.visibleNotifications$;
    }
}
