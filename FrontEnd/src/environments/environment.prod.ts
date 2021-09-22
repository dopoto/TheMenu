/**
 * The tokens below are set in Azure DevOps > Pipelines > Library > PROD 
 * and are replace during the Azure DevOps release.
 * */
export const environment = {
  production: true,
  apiEndpoint: '#{apiEndpoint}#',
  version: '#{Build.BuildNumber}#'
};
