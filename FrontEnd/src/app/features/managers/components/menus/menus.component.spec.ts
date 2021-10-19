import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusComponent } from './menus.component';

describe('MenusComponent', () => {
    let component: MenusComponent;
    let fixture: ComponentFixture<MenusComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MenusComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
