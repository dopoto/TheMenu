import { IServerConfig } from "./server-config";

export interface IConfig {
    production: boolean;
    version: string;
    apiEndpoint: string;
    serverConfig: IServerConfig;
}