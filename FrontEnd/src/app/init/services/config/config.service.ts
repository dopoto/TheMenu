import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IServerConfig } from '../../../core/models/server-config';
import { environment } from 'src/environments/environment';
import { IConfig } from '../../../core/models/config';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    config: IConfig | null = null;
    
    private serverConfigCache$: Observable<IServerConfig>;
    private CACHE_SIZE = 1;

    constructor(private http: HttpClient) {
        this.config = {
            ...environment,
            serverConfig: <IServerConfig>{},
        };
    }

    init() {
        this.fetchConfig();
        return this.serverConfigCache$
            .toPromise()
            .then(async (res) => {
                this.config = {
                    ...environment,
                    serverConfig: <IServerConfig>res,
                };
            });
    }

    private fetchConfig() {
        if (!this.serverConfigCache$) {
            this.serverConfigCache$ = this.http
                .get<IServerConfig>('/configuration/environment-specific')
                .pipe(shareReplay(this.CACHE_SIZE));
        }
    }
}
