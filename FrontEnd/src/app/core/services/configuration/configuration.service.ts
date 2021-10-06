import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { IServerConfiguration } from '../../models/server-configuration';
import { environment } from 'src/environments/environment';
import { IConfiguration } from '../../models/configuration';

@Injectable({
    providedIn: 'root',
})
export class ConfigurationService {
    
    static configuration: IConfiguration | null = null;

    constructor(private http: HttpClient) {
        ConfigurationService.configuration = {
            ...environment,
            serverConfiguration: <IServerConfiguration>{},
        };
    }

    static configFetched(): Promise<IConfiguration> {
        return new Promise(async (resolve) => {
            // Wait for the app config service to be loaded
            const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
            const waitFor = async function waitFor(f) {
                while (!f()) await sleep(500);
                return f();
            };
            await waitFor(() => {
                return ConfigurationService?.configuration;
            });
            resolve(ConfigurationService.configuration);
        });
    }

    async load(): Promise<IConfiguration> {
        try {
            // simulating HTTP request to obtain my config
            const promise = new Promise<IConfiguration>((resolve) => {
                setTimeout(async () => {
                    const serverConfig$ = this.http
                    .get<IServerConfiguration>(
                        'configuration/environment-specific'
                    );
                    const config: IServerConfiguration = await serverConfig$.toPromise();
                    ConfigurationService.configuration.serverConfiguration =
                        config;
                    resolve(ConfigurationService.configuration);
                }, 3000);
            }).then((config) => config);

            return promise;
        } catch (error) {
            //TODO log
            throw error;
        }
    }

    loadConfig() {
        return this.http
            .get<IServerConfiguration>('configuration/environment-specific')
            .toPromise()
            .then(
                (result) => {
                    ConfigurationService.configuration.serverConfiguration =
                        result;
                },
                (error) => console.error(error)
            );
    }

    loadConfig$() {
        //return of({});
        return this.http
            .get<IServerConfiguration>('configuration/environment-specific')
            .pipe(
                tap((result) => {
                    ConfigurationService.configuration.serverConfiguration =
                        result;
                })
            );
    }
}
