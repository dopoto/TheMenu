import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveStreamTileComponent } from './live-stream-tile.component';

describe('LiveStreamTileComponent', () => {
    let component: LiveStreamTileComponent;
    let fixture: ComponentFixture<LiveStreamTileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LiveStreamTileComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LiveStreamTileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
