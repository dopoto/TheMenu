import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IConfig } from 'src/app/core/models/config';
import { IServerConfig } from 'src/app/core/models/server-config';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
    let service: ConfigService;

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
        service = TestBed.inject(ConfigService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return a configuration', () => {
        const expected = {
            production: false,
            version: 'DEV',
            assetsUrl: '.',
            apiEndpoint: '',
            serverConfig: {
                applicationInsightsInstrumentationKey: '123',
                clientLoggingLogToApplicationInsights: 'true',
                clientLoggingLogToConsole: 'false',
                googleSignInClientId: 'G-1',
            },
        } as IConfig;
        mockResponse = <IServerConfig>{
            applicationInsightsInstrumentationKey: '123',
            clientLoggingLogToApplicationInsights: 'true',
            clientLoggingLogToConsole: 'false',
            googleSignInClientId: 'G-1',
        };

        service.init().then(() => {
            const actual = service.config;
            expect(actual).toEqual(expected);
        });

        const expectedEndpoint = `/configuration/environment-specific`;
        req = httpMock.expectOne(expectedEndpoint);
        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);
    });

    // TODO Test caching part
});
