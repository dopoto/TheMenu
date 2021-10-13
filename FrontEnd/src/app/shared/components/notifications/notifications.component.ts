import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/core/models/notification';
import { NotificationsService } from 'src/app/core/services/notifications/notifications.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent implements OnInit {
    notifications$: Observable<Notification[]>;

    constructor(public notificationsService: NotificationsService) {}

    ngOnInit(): void {
        this.notifications$ =
            this.notificationsService.getVisibleNotifications$();
    }

    close(alert: any): void {}
}
