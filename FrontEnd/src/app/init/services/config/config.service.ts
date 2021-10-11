import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IServerConfig } from '../../../core/models/server-config';
import { environment } from 'src/environments/environment';
import { IConfig } from '../../../core/models/config';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    config: IConfig | null = null;

    constructor(private http: HttpClient) {
        this.config = {
            ...environment,
            serverConfig: <IServerConfig>{},
        };
    }

    init() {
        return this.http
            .get('/configuration/environment-specific')
            .toPromise()
            .then(async (res) => {
                this.config = {
                    ...environment,
                    serverConfig: <IServerConfig>res,
                };
            });
    }
}
