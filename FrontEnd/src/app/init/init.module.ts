import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import {
    GoogleLoginProvider,
    SocialAuthServiceConfig,
} from 'angularx-social-login';

import { AuthGuard } from '../core/guards/auth-guard.service';
import { AppHttpInterceptor } from '../core/interceptors/http.interceptor';
import { LogService } from '../core/services/log/log.service';
import { ConfigService } from './services/config/config.service';

async function SocialAuthLoaderFactory(configService: ConfigService) {
    await configService.init();
    return new Promise(async (resolve) => {
        resolve({
            autoLogin: false,
            providers: [
                {
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider(
                        configService.config.serverConfig.googleSignInClientId
                    ),
                },
            ],
        } as SocialAuthServiceConfig);
    });
}

@NgModule({
    providers: [
        ConfigService,
        LogService,
        {
            provide: APP_INITIALIZER,
            useFactory:
                (configService: ConfigService, logService: LogService) =>
                () => {
                    configService.init().then(() => {
                        const cfg = configService.config.serverConfig;
                        const aiKey = cfg.applicationInsightsInstrumentationKey;
                        const logToConsole =
                            cfg.clientLoggingLogToConsole as unknown as boolean;
                        const logToAppInsights =
                            cfg.clientLoggingLogToApplicationInsights as unknown as boolean;
                        logService.initialize(
                            aiKey,
                            logToConsole,
                            logToAppInsights
                        );
                    });

                    // const cfg = configService.config.serverConfig;
                    // const aiKey = cfg.applicationInsightsInstrumentationKey;
                    // const logToConsole = cfg.clientLoggingLogToConsole as unknown as boolean;
                    // const logToAppInsights = cfg.clientLoggingLogToApplicationInsights as unknown as boolean;
                    // logService.initialize(aiKey, logToConsole, logToAppInsights);

                    // TODO
                    // const token: string = localStorage.getItem('token');
                    // authenticationService.tryRefreshingTokens(token).then((res) => {
                    //     console.log('was able to reauth on start = ' + res);
                    //     // TODO add ngrx initial state that checks it
                    // });
                },
            deps: [ConfigService, LogService],
            multi: true,
        },
        {
            provide: 'SocialAuthServiceConfig',
            useFactory: SocialAuthLoaderFactory,
            deps: [ConfigService],
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHttpInterceptor,
            multi: true,
        },
        { provide: LOCALE_ID, useValue: 'en-US' },
        AuthGuard,
    ],
})
export class InitModule {}
