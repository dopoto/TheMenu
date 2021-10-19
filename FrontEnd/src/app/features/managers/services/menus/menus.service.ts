import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LogService } from 'src/app/core/services/log/log.service';
import { Menu } from '../../models/menu';

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
                sections: [
                    { name: 'Drinks', menuItems: [] },
                    { name: 'Foods', menuItems: [] }
                ],
            },
        ];
        return of(fakeMenus);
    }
}
