import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { OrdersService } from './orders.service';

describe('OrdersService', () => {
    let service: OrdersService;
    let store: MockStore;
    const initialState = {};
    
    beforeEach(() => {
        TestBed.configureTestingModule({

            providers: [provideMockStore({ initialState })],
        });
        service = TestBed.inject(OrdersService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
