import { IServerConfiguration } from "./server-configuration";

export interface IConfiguration {
    production: boolean;
    version: string;
    apiEndpoint: string;
    serverConfiguration: IServerConfiguration;
}