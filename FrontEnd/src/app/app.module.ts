import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, FactoryProvider, NgModule } from '@angular/core';
import {
    SocialLoginModule,
    SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CustomersModule } from './features/customers/customers.module';
import { LandingModule } from './features/landing/landing.module';
import { ManagersModule } from './features/managers/managers.module';
import { StaffModule } from './features/staff/staff.module';
import { AuthGuard } from './core/guards/auth-guard.service';
import { AppHttpInterceptor } from './core/interceptors/http.interceptor';
//import { ConfigurationService } from './core/services/configuration/configuration.service';
import { tap } from 'rxjs/operators';

let googleSignInClientId = '';

// const appInitializerFn = (appConfig: ConfigurationService) => {
//     return () => {
//         // let appConfigPromise = appConfig.loadConfig();
//         // appConfigPromise.then(res => {
//         //     debugger;
//         //     googleSignInClientId = appConfig.configuration.serverConfiguration.googleSignInClientId;
//         // });
//         // return appConfigPromise;
//         return Promise.resolve();
//     };
// };

// function loadConfigFactory(configService: ConfigurationService) {
//     return () =>
//         configService.loadConfig$().pipe(
//             tap((value) => {
//                 console.log('vl:' + value);
//             })
//         );
// }

@NgModule({
    declarations: [AppComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        CoreModule.forRoot(),
        SharedModule,
        CustomersModule,
        LandingModule,
        ManagersModule,
        StaffModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHttpInterceptor,
            multi: true,
        },
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: loadConfigFactory,
        //     multi: true,
        //     deps: [ConfigurationService],
        // },
        AuthGuard,
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            '123382382905-fhngnav6413lmj57lc91ptjqil509cnv.apps.googleusercontent.com' //TODO
                        ),
                    },
                ],
            } as SocialAuthServiceConfig,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
