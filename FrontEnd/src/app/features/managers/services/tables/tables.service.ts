import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LogService } from 'src/app/core/services/log/log.service';
import { Table } from '../../models/table';

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
            {index: 'as345fwe', alias: 'My Table 1', seats: 2},
            {index: 'xtis06h6', alias: 'Window Table 1', seats: 6},
            {index: 'asd2waas', alias: 'My Table 3', seats:4},
            {index: 'cv345rws', alias: 'My Large Table', seats: 12},
        ];
        return of(fakeTables);
    }
}
