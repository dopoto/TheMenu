import {
    NgModule,
    SkipSelf,
    Optional,
    ModuleWithProviders,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';
import { StateModule } from '../state/state.module';
 

function tokenGetter() {
    return localStorage.getItem('token');
}

/**
 * Module containing providers for the singleton services loaded when the application starts.
 * By convention, this module is only included in the app once, in AppModule (only in the import property
 * of the @NgModule()decorator in app.module.ts, not in any other module's import). This will ensure that
 * services inside it will be only created once in the entire app.
 *
 * @tutorial https://angular.io/guide/styleguide#application-structure-and-ngmodules
 * @tutorial https://stackoverflow.com/a/46622924
 *
 */
@NgModule({
    imports: [
        StateModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ['localhost:5000'], //TODO ?
                disallowedRoutes: [],
            },
        }),
    ],
    exports: [TranslateModule],
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only'
            );
        }
    }

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [],
        };
    }
}
