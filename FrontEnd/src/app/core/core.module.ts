import {
    NgModule,
    SkipSelf,
    Optional,
    APP_INITIALIZER,
    ModuleWithProviders,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthEffects } from './store/effects/auth.effects';
import { reducers } from './store/app.states';
import { environment } from 'src/environments/environment';

// import { PortalConfigurationService } from './services/portal-configuration/portal-configuration.service';
// import { LogService } from './services/log/log.service';

/**
 * @description We need to fetch config data and initialize ApplicationInsights before the application starts
 */
// const initConfig =
//     (portalConfigurationService: PortalConfigurationService, logService: LogService) =>
//     () => {
//         const loadConfigPromise = portalConfigurationService.initialize();
//         loadConfigPromise.then(() => {
//             const instrumentationKey = portalConfigurationService.getData().iKey;
//             logService.initialize(instrumentationKey);
//         });
//         return loadConfigPromise;
//     };

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
        CommonModule,
        StoreModule.forRoot(reducers, {}),
        // Instrumentation must be imported after importing StoreModule (config is optional)
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        }),
        EffectsModule.forRoot([AuthEffects]),
    ],
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
            providers: [
                // {
                //     provide: APP_INITIALIZER,
                //     useFactory: initConfig,
                //     multi: true,
                //     deps: [PortalConfigurationService, LogService],
                // },
            ],
        };
    }
}
