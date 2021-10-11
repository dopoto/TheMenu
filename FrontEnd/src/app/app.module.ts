import {
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {
    LOCALE_ID,
    NgModule,
} from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CustomersModule } from './features/customers/customers.module';
import { LandingModule } from './features/landing/landing.module';
import { ManagersModule } from './features/managers/managers.module';
import { StaffModule } from './features/staff/staff.module';
import { AuthGuard } from './core/guards/auth-guard.service';
import { AppHttpInterceptor } from './core/interceptors/http.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InitModule } from './init/init.module';

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
        InitModule,
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
        { provide: LOCALE_ID, useValue: 'en-US' },
        AuthGuard,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
