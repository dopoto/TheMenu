import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { of } from 'rxjs';

import { NotificationsComponent } from './notifications.component';
import { NotificationsService } from '../../../core/services/notifications/notifications.service';

const mockNotifications = [
    { body: 'my body' },
    { body: 'another body' },
] as Notification[];

describe('NotificationsComponent', () => {
    let component: NotificationsComponent;
    let fixture: ComponentFixture<NotificationsComponent>;
    let notificationsServiceSpy: Spy<NotificationsService>;

    beforeEach(async () => {
        notificationsServiceSpy = createSpyFromClass(NotificationsService);
        notificationsServiceSpy.getVisibleNotifications$.and.returnValue(
            of(mockNotifications)
        );

        await TestBed.configureTestingModule({
            declarations: [NotificationsComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {
                    provide: NotificationsService,
                    useValue: notificationsServiceSpy,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(NotificationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display NotificationsService data', () => {
        // Assert
        component.notifications$.subscribe((res) => {
            expect(res[0].body).toEqual(mockNotifications[0].body);
            expect(res[1].body).toEqual(mockNotifications[1].body);
        });

        // Act
        component.ngOnInit();
    });

    // TODO Test sanitizeItems
});
