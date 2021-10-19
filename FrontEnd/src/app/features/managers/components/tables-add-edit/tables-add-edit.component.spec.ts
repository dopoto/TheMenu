import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesAddEditComponent } from './tables-add-edit.component';

describe('TablesAddEditComponent', () => {
    let component: TablesAddEditComponent;
    let fixture: ComponentFixture<TablesAddEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TablesAddEditComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TablesAddEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
