import { TestBed } from '@angular/core/testing';
import { createSpyFromClass } from 'jasmine-auto-spies';

import { LogService } from './log.service';
import { AppInsightsService } from '../app-insights/app-insights.service';
import { ConfigService } from '../config/config.service';

describe('LogService', () => {
    let service: LogService;
    let appInsightsServiceSpy: AppInsightsService;

    describe('when console logging is enabled', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    LogService,
                    {
                        provide: ConfigService,
                        useValue: {},
                    },
                ],
            });
            service = TestBed.inject(LogService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should output log message to console when debug() is called', () => {
            // Arrange
            const msg = 'test debug msg';
            const spy = spyOn(console, 'log').and.callFake(() => {
                return null;
            });
            service.initialize("123", true, false);

            // Act
            service.debug(msg);

            // Assert
            expect(spy).toHaveBeenCalledWith('[app-client.debug]:"test debug msg"');
        });

        it('should output log message to console when info() is called', () => {
            // Arrange
            const msg = 'test log msg';
            const spy = spyOn(console, 'log').and.callFake(() => {
                return null;
            });
            service.initialize("123", true, false);

            // Act
            service.info(msg);

            // Assert
            expect(spy).toHaveBeenCalledWith('[app-client.info]:"test log msg"');
        });

        it('should output error message to console when error() is called', () => {
            // Arrange
            const msg = 'test error msg';
            const spy = spyOn(console, 'error').and.callFake(() => {
                return null;
            });
            service.initialize("123", true, false);

            // Act
            service.error(msg);

            // Assert
            expect(spy).toHaveBeenCalledWith('[app-client.error]:test error msg');
        });

        it('should not output log message to ApplicationInsights when debug() is called', () => {
            // Arrange
            spyOn(console, 'log').and.callFake(() => {
                return null;
            });
            const msg = 'test msg';
            const appInsightsService = TestBed.inject(AppInsightsService);
            const spy1 = spyOn(appInsightsService, 'trackException');
            const spy2 = spyOn(appInsightsService, 'trackEvent');
            service.initialize("123", true, false);

            // Act
            service.debug(msg);

            // Assert
            expect(spy1).not.toHaveBeenCalled();
            expect(spy2).not.toHaveBeenCalled();
        });

        it('should not output log message to ApplicationInsights when info() is called', () => {
            // Arrange
            spyOn(console, 'log').and.callFake(() => {
                return null;
            });
            const msg = 'test msg';
            const appInsightsService = TestBed.inject(AppInsightsService);
            const spy1 = spyOn(appInsightsService, 'trackException');
            const spy2 = spyOn(appInsightsService, 'trackEvent');
            service.initialize("123", true, false);

            // Act
            service.info(msg);

            // Assert
            expect(spy1).not.toHaveBeenCalled();
            expect(spy2).not.toHaveBeenCalled();
        });

        it('should not output log message to ApplicationInsights when error() is called', () => {
            // Arrange
            spyOn(console, 'error').and.callFake(() => {
                return null;
            });
            const msg = 'test msg';
            const appInsightsService = TestBed.inject(AppInsightsService);
            const spy1 = spyOn(appInsightsService, 'trackException');
            const spy2 = spyOn(appInsightsService, 'trackEvent');
            service.initialize("123", true, false);

            // Act
            service.error(msg);

            // Assert
            expect(spy1).not.toHaveBeenCalled();
            expect(spy2).not.toHaveBeenCalled();
        });
    });

    describe('when ApplicationInsights logging is enabled', () => {
        beforeEach(() => {
            appInsightsServiceSpy = createSpyFromClass(AppInsightsService);
            TestBed.configureTestingModule({
                providers: [
                    LogService,
                    {
                        provide: ConfigService,
                        useValue: {},
                    },
                    { provide: AppInsightsService, useValue: appInsightsServiceSpy },
                ],
            });

            service = TestBed.inject(LogService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should output log message to ApplicationInsights when debug() is called', () => {
            // Arrange
            const msg = 'test msg';
            service.initialize("123", false, true);

            // Act
            service.debug(msg);

            // Assert
            expect(appInsightsServiceSpy.trackEvent).toHaveBeenCalledWith(
                '[app-client.debug]:"test msg"',
                undefined
            );
        });

        it('should output log message to ApplicationInsights when info() is called', () => {
            // Arrange
            const msg = 'test msg';
            service.initialize("123", false, true);

            // Act
            service.info(msg);

            // Assert
            expect(appInsightsServiceSpy.trackEvent).toHaveBeenCalledWith(
                '[app-client.info]:"test msg"',
                undefined
            );
        });

        it('should output error message to ApplicationInsights when error() is called', () => {
            // Arrange
            const error = 'test msg';
            const errorId = '1234';
            service.initialize("123", false, true);

            // Act
            service.error(error, errorId);

            // Assert
            const expectedError = new Error(`[app-client.error]:${error}`);
            expect(appInsightsServiceSpy.trackException).toHaveBeenCalledWith(
                expectedError,
                errorId
            );
        });

        it('should not output log message to console when debug() is called', () => {
            // Arrange
            const msg = 'test msg';
            const spy1 = spyOn(console, 'log');
            const spy2 = spyOn(console, 'error');
            service.initialize("123", false, true);

            // Act
            service.debug(msg);

            // Assert
            expect(spy1).not.toHaveBeenCalled();
            expect(spy2).not.toHaveBeenCalled();
        });

        it('should not output log message to console when info() is called', () => {
            // Arrange
            const msg = 'test msg';
            const spy1 = spyOn(console, 'log');
            const spy2 = spyOn(console, 'error');
            service.initialize("123", false, true);

            // Act
            service.info(msg);

            // Assert
            expect(spy1).not.toHaveBeenCalled();
            expect(spy2).not.toHaveBeenCalled();
        });

        it('should not output log message to console when error() is called', () => {
            // Arrange
            const msg = 'test msg';
            const spy1 = spyOn(console, 'log');
            const spy2 = spyOn(console, 'error');
            service.initialize("123", false, true);

            // Act
            service.error(msg);

            // Assert
            expect(spy1).not.toHaveBeenCalled();
            expect(spy2).not.toHaveBeenCalled();
        });
    });
});
