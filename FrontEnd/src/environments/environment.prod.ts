import { IConfig } from 'src/app/core/models/config';
import { IServerConfig } from 'src/app/core/models/server-config';

/**
 * The hashtag/bracket tokens below are set in Azure DevOps > Pipelines > Library > PROD
 * and are replaced during the Azure DevOps release.
 * */
 export const environment: IConfig = {
    production: true,
    apiEndpoint: '#{ApiEndpoint}#',
    assetsUrl: '#{AssetsUrl}#',
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
