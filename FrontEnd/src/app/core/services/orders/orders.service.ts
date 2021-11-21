import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsDemo } from 'src/app/state/selectors/user.selectors';

@Injectable({
    providedIn: 'root',
})
export class OrdersService {
    isDemo$: Observable<boolean> | undefined;

    constructor(private readonly store: Store) {
        this.isDemo$ = this.store.pipe(select(selectIsDemo));
    }
}
