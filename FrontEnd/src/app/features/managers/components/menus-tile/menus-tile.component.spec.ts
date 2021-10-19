import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusTileComponent } from './menus-tile.component';

describe('MenusTileComponent', () => {
    let component: MenusTileComponent;
    let fixture: ComponentFixture<MenusTileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MenusTileComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenusTileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
