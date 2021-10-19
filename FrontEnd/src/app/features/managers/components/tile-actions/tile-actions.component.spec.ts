import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileActionsComponent } from './tile-actions.component';

describe('TileActionsComponent', () => {
    let component: TileActionsComponent;
    let fixture: ComponentFixture<TileActionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TileActionsComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TileActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
