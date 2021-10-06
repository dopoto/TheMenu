import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { IServerConfig } from '../../models/server-config';
import { environment } from 'src/environments/environment';
import { IConfig } from '../../models/config';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    static config: IConfig | null = null;

    constructor(private http: HttpClient) {
        ConfigService.config = {
            ...environment,
            serverConfig: <IServerConfig>{},
        };
    }

    static configFetched(): Promise<IConfig> {
        return new Promise(async (resolve) => {
            // Wait for the app config service to be loaded
            const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
            const waitFor = async function waitFor(f) {
                while (!f()) await sleep(500);
                return f();
            };
            await waitFor(() => {
                return ConfigService?.config;
            });
            resolve(ConfigService.config);
        });
    }

    async load(): Promise<IConfig> {
        try {
            const promise = new Promise<IConfig>((resolve) => {
                setTimeout(async () => {
                    const endpoint = 'configuration/environment-specific';
                    const serverConfig$ =
                        this.http.get<IServerConfig>(endpoint);
                    const config: IServerConfig =
                        await serverConfig$.toPromise();
                    ConfigService.config.serverConfig = config;
                    resolve(ConfigService.config);
                }, 3000);
            }).then((config) => config);
            return promise;
        } catch (error) {
            //TODO log
            throw error;
        }
    }
}
