import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServersTileComponent } from './servers-tile.component';

describe('ServersTileComponent', () => {
    let component: ServersTileComponent;
    let fixture: ComponentFixture<ServersTileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServersTileComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ServersTileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
