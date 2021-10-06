export interface IServerConfig {
    googleSignInClientId: string;
    applicationInsightsInstrumentationKey: string;
    clientLoggingLogToConsole: "true"|"false",
    clientLoggingLogToApplicationInsights: "true"|"false"
}