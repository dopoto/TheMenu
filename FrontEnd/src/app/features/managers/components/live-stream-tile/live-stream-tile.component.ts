import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, mergeAll, Observable, reduce, take, tap, toArray } from 'rxjs';
import { Order } from 'src/app/core/models/order';
import { selectActiveOrders } from 'src/app/state/selectors/current-location.selectors';

@Component({
    selector: 'app-live-stream-tile',
    templateUrl: './live-stream-tile.component.html',
    styleUrls: ['./live-stream-tile.component.scss'],
})
export class LiveStreamTileComponent {
    activeOrders$: Observable<Order[]> | undefined;

    constructor(private readonly store: Store) {
        this.activeOrders$ = this.store.select(selectActiveOrders).pipe(
            filter(arr => arr && arr.length > 1),
            map((arr) =>
                arr.sort((a, b) => b?.date?.getTime() - a?.date?.getTime())
            ),
            map((arr) => {
                return arr.slice(0, 20);
            })
        );
    }
}
