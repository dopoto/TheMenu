import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LogService } from 'src/app/core/services/log/log.service';
import { Menu } from 'src/app/core/models/menu';

@Injectable({
    providedIn: 'root',
})
export class MenusService {
    constructor(public logService: LogService, private http: HttpClient) {}

    getMenus$(): Observable<Menu[]> {
        // TODO
        // const url = `/api/tables?location=...`;
        // return this.http.get<Menu[]>(url);
        const fakeMenus = <Menu[]>[
            {
                id: 'as345fwe',
                name: 'My Menu 1',
                categories: [
                    { name: 'Drinks', items: [] },
                    { name: 'Foods', items: [] }
                ],
            },
        ];
        return of(fakeMenus);
    }
}
