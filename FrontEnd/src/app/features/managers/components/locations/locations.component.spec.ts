import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsComponent } from './locations.component';

xdescribe('LocationsComponent', () => {
    let component: LocationsComponent;
    let fixture: ComponentFixture<LocationsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LocationsComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LocationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
