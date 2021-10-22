import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { DemoModeComponent } from './demo-mode.component';

describe('DemoModeComponent', () => {
    let component: DemoModeComponent;
    let fixture: ComponentFixture<DemoModeComponent>;

    let store: MockStore;
    const initialState = {};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DemoModeComponent],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();

        store = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoModeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
