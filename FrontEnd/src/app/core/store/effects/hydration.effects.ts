import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import * as HydrationActions from '../actions/hydration.actions';
import { AppState } from '../app.state';

@Injectable()
export class HydrationEffects implements OnInitEffects {
    hydrate$ = createEffect(() =>
        this.action$.pipe(
            ofType(HydrationActions.hydrate),
            map(() => {
                const storageValue = localStorage.getItem('state');
                //TODO Does not pick up logged in users correctly (users show up as logged in even when token is expired)
                if (storageValue) {
                    try {
                        const state = JSON.parse(storageValue);
                        return HydrationActions.hydrateSuccess({ state });
                    } catch {
                        localStorage.removeItem('state');
                    }
                }
                return HydrationActions.hydrateFailure();
            })
        )
    );

    serialize$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(
                    HydrationActions.hydrateSuccess,
                    HydrationActions.hydrateFailure
                ),
                switchMap(() => this.store),
                distinctUntilChanged(),
                tap((state) => {
                    let parsedState = JSON.parse(JSON.stringify(state));
                    parsedState.auth.notification = null;    
                    localStorage.setItem('state', JSON.stringify(parsedState));
                })
            ),
        { dispatch: false }
    );

    constructor(private action$: Actions, private store: Store<AppState>) {}

    ngrxOnInitEffects(): Action {
        return HydrationActions.hydrate();
    }
}
