import {
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {
    APP_INITIALIZER,
    FactoryProvider,
    LOCALE_ID,
    NgModule,
} from '@angular/core';
import { SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CustomersModule } from './features/customers/customers.module';
import { LandingModule } from './features/landing/landing.module';
import { ManagersModule } from './features/managers/managers.module';
import { StaffModule } from './features/staff/staff.module';
import { AuthGuard } from './core/guards/auth-guard.service';
import { AppHttpInterceptor } from './core/interceptors/http.interceptor';
import { ConfigService } from './core/services/config/config.service';
import { LogService } from './core/services/log/log.service';
import { AuthenticationService } from './core/services/authentication/authentication.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { tap } from 'rxjs/operators';

// export function AppConfigServiceFactory(
//     configService: ConfigService,
//     logService: LogService,
//     authenticationService: AuthenticationService
// ): () => void {
//     return async () => {
//         // await configService.load();
//         // const config = await ConfigService.configFetched();
// const config = await configService.load();
//         const aiKey = config.serverConfig.applicationInsightsInstrumentationKey;
//         const logToConsole = config.serverConfig
//             .clientLoggingLogToConsole as unknown as boolean;
//         const logToAppInsights = config.serverConfig
//             .clientLoggingLogToApplicationInsights as unknown as boolean;
//         logService.initialize(aiKey, logToConsole, logToAppInsights);

//         const token: string = localStorage.getItem('token');
//         authenticationService.tryRefreshingTokens(token).then((res) => {
//             console.log('was able to reauth on start = ' + res);
//             // TODO add ngrx initial state that checks it
//         });
//     };
// }

let gscid: Promise<string>;

function loadConfigFactory(configService: ConfigService) {
    // Easy as pie 🥧
    return () =>
        configService.getConfig().pipe(
            tap((value) => {
                gscid = Promise.resolve(value.serverConfig.googleSignInClientId);
                console.log("loadConfigFactory" + gscid);
            })
        ); // 👈

    // How you might've done it "before"
    // return () => configService.getConfig().toPromise();
}

export const loadConfigProvider: FactoryProvider = {
    provide: APP_INITIALIZER,
    useFactory: loadConfigFactory,
    deps: [ConfigService],
    multi: true,
};

/**
 * The http loader factory : Loads the files from define path.
 * @param {HttpClient} http
 * @returns {TranslateHttpLoader}
 * @constructor
 */
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/locales/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en-US',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        CoreModule.forRoot(),
        SharedModule,
        CustomersModule,
        LandingModule,
        ManagersModule,
        StaffModule,
    ],
    providers: [
        // LogService,
        // ConfigService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHttpInterceptor,
            multi: true,
        },
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: AppConfigServiceFactory,
        //     deps: [ConfigService, LogService, AuthenticationService],
        //     multi: true,
        // },
        loadConfigProvider,
        { provide: LOCALE_ID, useValue: 'en-US' },
        AuthGuard,
        {
            provide: 'SocialAuthServiceConfig',
            useValue: new Promise(async (resolve) => {
                //const config = await ConfigService.configFetched();
                console.log("ocialauth:" + gscid);
                resolve({
                    autoLogin: false,
                    providers: [
                        {
                            id: GoogleLoginProvider.PROVIDER_ID,
                            provider: new GoogleLoginProvider(await gscid),
                        },
                    ],
                } as SocialAuthServiceConfig);
            }),
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
