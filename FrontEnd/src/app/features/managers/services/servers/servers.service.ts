import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Server } from 'src/app/core/models/server';
import { LogService } from 'src/app/core/services/log/log.service';

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
            {id: 'as345fwe', name: 'My Server 1',},
            {id: 'xtis06h6', name: 'Window Server 1',},
            {id: 'asd2waas', name: 'My Server 3',},
            {id: 'cv345rws', name: 'My Large Server',},
        ];
        return of(fakeServers);
    }
}
