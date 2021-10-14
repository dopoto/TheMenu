import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    SecurityContext,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

    constructor(
        public notificationsService: NotificationsService,
        public sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.notifications$ = this.notificationsService
            .getVisibleNotifications$()
            .pipe(map(items => this.sanitizeItems(items)))
    }
    
    private sanitizeItems(items: Notification[]): Notification[] {
        items.forEach(
            (item) =>
                (item.body = this.sanitizer.sanitize(
                    SecurityContext.HTML,
                    item.body
                ))
        )
        return items;
    }
}
