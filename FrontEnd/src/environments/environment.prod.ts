import { IConfig } from 'src/app/core/models/config';
import { IServerConfig } from 'src/app/core/models/server-config';

/**
 * The tokens below are set in Azure DevOps > Pipelines > Library > PROD
 * and are replace during the Azure DevOps release.
 * */
 export const environment: IConfig = {
    production: true,
    apiEndpoint: '#{ApiEndpoint}#',
    version: '#{Build.BuildNumber}#',

    /**
     * Environment-specific variables that should not be source controlled.
     * In prod mode, these should be set in the AzureDevops Library.
     * These are fetched from a server endpoint when the app is bootstrapped.
     */
    serverConfig: <IServerConfig>{
        googleSignInClientId: '',
    },
};
