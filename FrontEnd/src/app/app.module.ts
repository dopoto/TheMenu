import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
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

export function AppConfigServiceFactory(
    configService: ConfigService
): () => void {
    return async () => await configService.load();
}

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
        ConfigService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHttpInterceptor,
            multi: true,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: AppConfigServiceFactory,
            deps: [ConfigService],
            multi: true,
        },
        AuthGuard,
        {
            provide: 'SocialAuthServiceConfig',
            useValue: new Promise(async (resolve) => {
                const config = await ConfigService.configFetched();
                resolve({
                    autoLogin: false,
                    providers: [
                        {
                            id: GoogleLoginProvider.PROVIDER_ID,
                            provider: new GoogleLoginProvider(
                                config.serverConfig.googleSignInClientId
                            ),
                        },
                    ],
                } as SocialAuthServiceConfig);
            }),
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
