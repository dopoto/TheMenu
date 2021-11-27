import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Table } from 'src/app/core/models/table';
import { LogService } from 'src/app/core/services/log/log.service';

@Injectable({
    providedIn: 'root',
})
export class TablesService {
    constructor(public logService: LogService, private http: HttpClient) {}

    getTables$(): Observable<Table[]> {
        // TODO
        // const url = `/api/tables?location=...`;
        // return this.http.get<Table[]>(url);
        const fakeTables = <Table[]>[
            {id: 'as345fwe', name: 'My Table 1', seats: 2},
            {id: 'xtis06h6', name: 'Window Table 1', seats: 6},
            {id: 'asd2waas', name: 'My Table 3', seats:4},
            {id: 'cv345rws', name: 'My Large Table', seats: 12},
        ];
        return of(fakeTables);
    }
}
