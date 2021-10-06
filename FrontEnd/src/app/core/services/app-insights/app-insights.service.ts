import { Injectable, NgZone } from '@angular/core';
import {
    ApplicationInsights,
    IPageViewTelemetry,
} from '@microsoft/applicationinsights-web';
import { environment } from 'src/environments/environment';

/**
 * Provides integration with Application Insights. NOTE: To track events or log messages, use 
 *  instead - it provides a full wrapper for functionality related to Application Insights.
 */
@Injectable({
    providedIn: 'root',
})
export class AppInsightsService {
    public appInsights: ApplicationInsights;

    constructor(public ngZone: NgZone) {}

    initialize(instrumentationKey: string): void {
        this.ngZone.runOutsideAngular(() => {
            this.appInsights = new ApplicationInsights({
                config: {
                    instrumentationKey,
                    autoTrackPageVisitTime: true,
                },
            });
            this.appInsights.loadAppInsights();
            this.appInsights.trackPageView();
        });
    }

    setUserTelemetryProperties(authenticatedUserId?: string, accountId?: string): void {
        const telemetryInitializer = envelope => {
            envelope.data.resolutionHeight = window.screen.height;
            envelope.data.resolutionWidth = window.screen.width;

            if (!authenticatedUserId) {
                envelope.tags['ai.cloud.role'] = 'Anonymous';
            } else {
                envelope.tags['ai.cloud.role'] = 'Authenticated';
                envelope.tags['ai.user.id'] = authenticatedUserId;
                envelope.tags['ai.user.authenticatedId'] = authenticatedUserId;
                envelope.tags['ai.user.accountId'] = accountId;
                this.appInsights.setAuthenticatedUserContext(
                    authenticatedUserId,
                    accountId
                );
            }
        };
        this.appInsights.addTelemetryInitializer(telemetryInitializer);
        this.appInsights.trackPageView();
    }

    trackEvent(name: string, properties?: { [key: string]: unknown }): void {
        const eventData = { name, properties: properties || {} };
        eventData.properties['currentEnvironment'] = environment.production ? 'PROD' : 'DEV';
        this.appInsights.trackEvent(eventData);
    }

    trackPageView(data?: IPageViewTelemetry): void {
        const dataToSend: IPageViewTelemetry = data ? data : {};
        dataToSend.properties = { currentEnvironment: environment.production ? 'PROD' : 'DEV' };
        this.appInsights.trackPageView(data);
    }

    trackException(exception: Error, errorId?: string): void {
        this.appInsights.trackException({
            id: errorId,
            exception: exception,
        });
    }
}
