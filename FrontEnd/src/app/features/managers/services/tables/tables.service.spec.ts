import {
    TestRequest,
    HttpTestingController,
    HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TablesService } from './tables.service';

describe('TablesService', () => {
    let service: TablesService;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockResponse: any;
    let req: TestRequest;

    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [HttpClientTestingModule],
            providers: [],
        }).compileComponents();
        service = TestBed.inject(TablesService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
