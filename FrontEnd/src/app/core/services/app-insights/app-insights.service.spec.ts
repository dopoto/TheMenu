import { TestBed, inject } from '@angular/core/testing';
import { NgZone } from '@angular/core';
import { IPageViewTelemetry } from '@microsoft/applicationinsights-web';

import { AppInsightsService } from './app-insights.service';

describe('AppInsightsService', () => {
    let service: AppInsightsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AppInsightsService],
        }).compileComponents();

        service = TestBed.inject(AppInsightsService);
    });

    it('should be created', inject([AppInsightsService], (srv: AppInsightsService) => {
        expect(srv).toBeTruthy();
    }));

    it('should initialize outside Angular zone', inject(
        [AppInsightsService],
        (srv: AppInsightsService) => {
            // Arrange
            const ngZone = TestBed.inject(NgZone);
            // eslint-disable-next-line @typescript-eslint/ban-types
            const spy = spyOn(ngZone, 'runOutsideAngular').and.callFake((fn: Function) =>
                fn()
            );

            // Act
            srv.initialize('1234');

            // Assert
            expect(spy).toHaveBeenCalledTimes(1);
        }
    ));

    it('should track events', () => {
        // Arrange
        service.initialize('1234');
        const spy = spyOn(service.appInsights, 'trackEvent');

        // Act
        service.trackEvent('some event');

        // Assert
        const expectedData = {
            name: 'some event',
            properties: {
                currentEnvironment: 'DEV',
            },
        };
        expect(spy).toHaveBeenCalledWith(expectedData);
    });

    it('should track events with custom properties', () => {
        // Arrange
        service.initialize('1234');
        const spy = spyOn(service.appInsights, 'trackEvent');

        // Act
        service.trackEvent('some event', { someProp: 'some value' });

        // Assert
        const expectedData = {
            name: 'some event',
            properties: {
                someProp: 'some value',
                currentEnvironment: 'DEV',
            },
        };
        expect(spy).toHaveBeenCalledWith(expectedData);
    });

    it('should track page views', () => {
        // Arrange
        service.initialize('1234');
        const spy = spyOn(service.appInsights, 'trackPageView');
        const trackData = { name: 'td' } as IPageViewTelemetry;

        // Act
        service.trackPageView(trackData);

        // Assert
        const expectedData = {
            name: 'td',
            properties: {
                currentEnvironment: 'DEV',
            },
        };
        expect(spy).toHaveBeenCalledWith(expectedData);
    });

    it('should track exceptions', () => {
        // Arrange
        service.initialize('1234');
        const spy = spyOn(service.appInsights, 'trackException');
        const trackErrorData = { message: 'error msg' } as Error;

        // Act
        service.trackException(trackErrorData);

        // Assert
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
