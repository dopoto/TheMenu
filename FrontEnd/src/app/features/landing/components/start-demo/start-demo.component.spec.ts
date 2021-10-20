import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { StartDemoComponent } from './start-demo.component';

describe('StartDemoComponent', () => {
    let component: StartDemoComponent;
    let fixture: ComponentFixture<StartDemoComponent>;

    let store: MockStore;
    const initialState = {};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StartDemoComponent],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();
        
        store = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StartDemoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
