import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LogService } from 'src/app/core/services/log/log.service';
import { Server } from '../../models/server';

@Injectable({
    providedIn: 'root',
})
export class ServersService {
    constructor(public logService: LogService, private http: HttpClient) {}

    getServers$(): Observable<Server[]> {
        // TODO
        // const url = `/api/servers?location=...`;
        // return this.http.get<Server[]>(url);
        const fakeServers = <Server[]>[
            {id: 'as345fwe', alias: 'My Server 1',},
            {id: 'xtis06h6', alias: 'Window Server 1',},
            {id: 'asd2waas', alias: 'My Server 3',},
            {id: 'cv345rws', alias: 'My Large Server',},
        ];
        return of(fakeServers);
    }
}
