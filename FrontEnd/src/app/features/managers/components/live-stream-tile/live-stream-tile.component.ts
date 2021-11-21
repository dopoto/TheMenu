import {
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes,
} from '@angular/animations';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable, tap } from 'rxjs';
import { Order } from 'src/app/core/models/order';
import { selectActiveOrders } from 'src/app/state/selectors/current-location.selectors';

@Component({
    selector: 'app-live-stream-tile',
    templateUrl: './live-stream-tile.component.html',
    styleUrls: ['./live-stream-tile.component.scss'],
    animations: [
        trigger('divState', [
            state(
                'in',
                style({ backgroundColor: 'red', transform: 'translateX(0)' })
            ),

            transition('void => *', [
                animate(
                    200,
                    keyframes([
                        style({
                            opacity: 0,
                            transform: 'translateX(-100%)',
                            offset: 0,
                        }),
                        // style({
                        //     backgroundColor: '#bee0ff',
                        //     opacity: 1,
                        //     transform: 'translateX(15px)',
                        //     offset: 0.3,
                        // }),
                        style({
                            opacity: 1,
                            transform: 'translateX(0)',
                            offset: 1.0,
                        }),
                    ])
                ),
            ]),
            transition('* => void', [
                animate(
                    300,
                    keyframes([
                        style({
                            opacity: 1,
                            transform: 'translateX(0)',
                            offset: 0,
                        }),
                        // style({
                        //     opacity: 1,
                        //     transform: 'translateX(-15px)',
                        //     offset: 0.7,
                        // }),
                        style({
                            opacity: 0,
                            transform: 'translateX(100%)',
                            offset: 1.0,
                        }),
                    ])
                ),
            ]),
        ]),
    ],
})
export class LiveStreamTileComponent {
    activeOrders$: Observable<Order[]> | undefined;

    state = 'normal';
    wildState = 'normal';

    constructor(private readonly store: Store) {
        this.activeOrders$ = this.store.select(selectActiveOrders).pipe(
            filter((arr) => arr && arr.length > 1),
            map((arr) => {
                return arr.sort((a, b) =>
                    (new Date(b?.date)).getTime() - (new Date(a?.date)).getTime()      
                );}
            ),
            map((arr) => {
                return arr.slice(0, 20);
            })
        );
    }

    onAnimate() {
        this.state == 'normal'
            ? (this.state = 'highlighted')
            : (this.state = 'normal');
    }

    onShrink() {
        this.wildState == 'normal'
            ? (this.wildState = 'shrunk')
            : (this.wildState = 'normal');
    }
}
