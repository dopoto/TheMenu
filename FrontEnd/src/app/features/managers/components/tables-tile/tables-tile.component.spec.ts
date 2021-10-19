import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { TablesTileComponent } from './tables-tile.component';

describe('TablesTileComponent', () => {
    let component: TablesTileComponent;
    let fixture: ComponentFixture<TablesTileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TablesTileComponent],            
            schemas: [NO_ERRORS_SCHEMA],
            imports: [TranslateModule.forRoot()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TablesTileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
