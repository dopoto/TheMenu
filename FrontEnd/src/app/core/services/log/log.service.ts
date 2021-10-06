import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AppInsightsService } from '../app-insights/app-insights.service';
import { IPageViewTelemetry } from '@microsoft/applicationinsights-web';
import { ConfigService } from '../config/config.service';

/**
 * Provides environment-specific logging.
 */
@Injectable({
    providedIn: 'root',
})
export class LogService {
    private logToConsole: boolean;
    private logToApplicationInsights: boolean;

    constructor(private appInsightsService: AppInsightsService) {}

    public initialize(instrumentationKey: string, logToConsole: boolean, logToAppInsights: boolean): void {
        this.logToConsole = logToConsole;
        this.logToApplicationInsights = logToAppInsights;
        if (this.logToApplicationInsights) {
            this.appInsightsService.initialize(instrumentationKey);
        }
    }

    /**
     * @see https://github.com/Steve-Fenton/TypeScriptUtilities/blob/master/Guid
     */
    public generateErrorId(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (c) {
                const r = (Math.random() * 16) | 0,
                    v = c == 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            }
        );
    }

    public trackPageView(data: IPageViewTelemetry): void {
        if (this.logToApplicationInsights) {
            this.appInsightsService.trackPageView(data);
        }
    }

    public setUserTelemetryProperties(
        authenticatedUserId?: string,
        accountId?: string
    ): void {
        if (this.logToApplicationInsights) {
            this.appInsightsService.setUserTelemetryProperties(
                authenticatedUserId,
                accountId
            );
        }
    }

    /**
     * Outputs to console in JSON format (dev mode only).
     * @param message The JSON string to be displayed.
     */
    public json(message: string): void {
        if (this.logToConsole) {
            console.log('%j', message);
        }
    }

    public debug(message: string): void {
        this.handleNonError('debug', message);
    }

    public info(message: string): void {
        this.handleNonError('info', message);
    }

    public warning(message: string): void {
        this.handleNonError('warning', message);
    }

    public track(
        message: string,
        properties: { [key: string]: unknown }
    ): void {
        this.handleNonError('track', message, properties);
    }

    public error(
        error: string | Error | TypeError | HttpErrorResponse,
        errorId?: string
    ): void {
        let errorToLog: string;
        if (typeof error === 'object' && (<TypeError>error).stack) {
            errorToLog = (<TypeError>error).stack;
        } else if (typeof error === 'string') {
            errorToLog = error;
        } else {
            errorToLog = JSON.stringify(error);
        }
        errorToLog = `[app-client.error]:` + errorToLog;

        if (this.logToConsole) {
            console.error(errorToLog);
        }

        if (this.logToApplicationInsights) {
            try {
                this.appInsightsService.trackException(
                    new Error(errorToLog),
                    errorId
                );
            } catch (ex) {
                // No action on catch
            }
        }
    }

    private handleNonError(
        type: 'debug' | 'info' | 'warning' | 'track',
        message: string,
        properties?: { [key: string]: unknown }
    ): void {
        const msg = `[app-client.${type}]:${JSON.stringify(message)}`;

        if (this.logToConsole) {
            console.log(msg);
        }

        if (this.logToApplicationInsights) {
            this.appInsightsService.trackEvent(msg, properties);
        }
    }
}
