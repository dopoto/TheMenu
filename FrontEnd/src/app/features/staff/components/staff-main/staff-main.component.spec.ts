import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMainComponent } from './staff-main.component';

describe('StaffMainComponent', () => {
    let component: StaffMainComponent;
    let fixture: ComponentFixture<StaffMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StaffMainComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StaffMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
