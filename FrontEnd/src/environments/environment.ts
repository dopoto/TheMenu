// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IConfiguration } from 'src/app/core/models/configuration';
import { IServerConfiguration } from 'src/app/core/models/server-configuration';

export const environment: IConfiguration = {
    production: false,
    version: 'DEV',
    apiEndpoint: 'http://localhost:5063',

    /**
     * Environment-specific variables that should not be source controlled.
     * In dev mode, these should be set in a secrets.json file.
     * @see https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-6.0&tabs=windows#enable-secret-storage
     * These are fetched from a server endpoint when the app is bootstrapped.
     */
    serverConfiguration: <IServerConfiguration>{
        googleSignInClientId: '',
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
