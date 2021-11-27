import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { LiveStreamTileComponent } from './live-stream-tile.component';

describe('LiveStreamTileComponent', () => {
    let component: LiveStreamTileComponent;
    let fixture: ComponentFixture<LiveStreamTileComponent>;

    let store: MockStore;
    const initialState = {};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LiveStreamTileComponent],
            providers: [provideMockStore({ initialState })],          
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        store = TestBed.inject(MockStore);
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
