import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
    concatMap,
    delay,
    filter,
    map,
    Observable,
    of,
    range,
    switchMap,
} from 'rxjs';

import { DemoData } from 'api/generated-models';
import { AppState } from 'src/app/state/app.state';
import { DemoSettings } from 'src/app/state/models/demo-settings';
import { LogService } from '../log/log.service';
import { selectIsDemo } from 'src/app/state/selectors/user.selectors';
import { Order } from '../../models/order';
import {
    selectCurrentLocationState,
    selectMenus,
} from 'src/app/state/selectors/current-location.selectors';
import { CurrentLocationState } from 'src/app/state/models/current-location-state';
import { Menu } from '../../models/menu';
import { addOrder } from 'src/app/state/actions/current-location.actions';
import { OrderItem } from '../../models/order-item';
import { OrderStatusTypes } from '../../models/order-status-types';

@Injectable({
    providedIn: 'root',
})
export class DemoService {
    // TODO https://angular.io/guide/web-worker ?

    currentLocation: CurrentLocationState | undefined;
    aMenu: Menu | undefined;

    constructor(
        public logService: LogService,
        private http: HttpClient,
        private readonly store: Store
    ) {
        this.store
            .select(selectCurrentLocationState)
            .pipe(filter((loc) => loc?.id !== undefined))
            .subscribe((loc) => {
                this.currentLocation = loc;
            });

        this.store
            .select(selectMenus)
            .pipe(filter((mnus) => mnus && mnus[0] !== undefined))
            .subscribe((mnus) => {
                this.aMenu = mnus[0];
            });

        // Emit a random demo order at random intervals (1 - 10 seconds)
        range(1, 10000)
            .pipe(
                concatMap((i) =>
                    of(i).pipe(delay(1000 + Math.random() * 10000))
                ),
                switchMap(() => this.store.pipe(select(selectIsDemo))),
                filter((isDemo) => isDemo === true)
                // TODO filter by Simulate customers activity = true
            )
            .subscribe(() => {
                const randomOrder = this.generateDemoOrder();
                this.store.dispatch(addOrder({ order: randomOrder }));
            });
    }

    generateDemoOrder(): Order {
        const loc = this.currentLocation;
        const notes = [
            '',
            'Better be fresh!',
            'With lots of ice',
            '',
            '',
            'Well done',
        ];
        const menuItems = this.aMenu.categories[0].items;
        return {
            date: new Date(),
            locationId: this.currentLocation.id,
            tableId:
                loc.tables[Math.floor(Math.random() * loc.tables.length)].id,
            serverId:
                loc.servers[Math.floor(Math.random() * loc.servers.length)].id,
            items: [
                {
                    id: '',
                    menuItemId:
                        menuItems[Math.floor(Math.random() * menuItems.length)]
                            .id,
                    quantity: Math.ceil(Math.random() * 10),
                    notes: notes[Math.floor(Math.random() * notes.length)],
                } as OrderItem,
            ],
            status: OrderStatusTypes.pending
        } as Order;
    }

    getDemoData$(demoSettings: DemoSettings): Observable<AppState> {
        const demoData$ = this.http.get<DemoData>('/demo', {});
        return demoData$.pipe(
            map((res) => {
                const csu = res.clientSideUser;
                const demoData = {
                    auth: {
                        isAuthenticated: true,
                        isDemo: true,
                        user: {
                            id: csu.id,
                            email: csu.email,
                            firstName: csu.firstName,
                            lastName: csu.lastName,
                            photoUrl: csu.photoUrl,
                        },
                        notificationId: '[Auth] Login Success',
                    },
                    meta: {
                        appVersion: 'DEMO',
                        stateVersion: '1',
                        initializedOn: new Date('2021-10-20T04:00:17.100Z'),
                    },
                    demo: {
                        simulateCustomersActivity:
                            demoSettings.simulateCustomersActivity,
                        simulateServersActivity:
                            demoSettings.simulateServersActivity,
                    },
                    locations: {
                        // TODO
                    },
                    currentLocation: {
                        // TODO Get from server
                        id: '1',
                        name: 'Restaurant Belvedere',
                        servers: [
                            { id: 'S1', name: 'Johnny' },
                            { id: 'S2', name: 'Laura Doe' },
                        ],
                        menus: [
                            {
                                categories: [
                                    {
                                        items: [
                                            {
                                                id: 'I1',
                                                name: 'Mamaliguta cu branza',
                                                price: 12,
                                            },
                                            {
                                                id: 'I2',
                                                name: 'Papanasi',
                                                price: 23,
                                            },
                                            {
                                                id: 'I3',
                                                name: 'Mici cu mustar',
                                                price: 41,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                        tables: [
                            { id: 'T1', name: 'Table 1', seats: 4 },
                            { id: 'T2', name: 'Table 2', seats: 2 },
                            { id: 'T3', name: 'Table 3', seats: 6 },
                        ],
                        orders: [
                            this.generateDemoOrder(),
                            this.generateDemoOrder(),
                            this.generateDemoOrder()
                        ]
                    },
                } as AppState;
                return demoData;
            })
        );
    }
}
