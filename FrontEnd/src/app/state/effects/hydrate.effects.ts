import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
    distinctUntilChanged,
    map,
    switchMap,
    tap,
} from 'rxjs/operators';

import * as HydrationActions from '../actions/hydrate.actions';
import { AppState } from '../app.state';

@Injectable()
export class HydrateEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>
    ) {}

    hydrate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HydrationActions.hydrateStart),
            map(() => {
                const storageValue = localStorage.getItem('state');
                //TODO Does not pick up logged in users correctly (users show up as logged in even when token is expired)
                if (storageValue) {
                    try {
                        const state = JSON.parse(storageValue);
                        return HydrationActions.hydrateOk({ state });
                    } catch {
                        localStorage.removeItem('state');
                    }
                }
                return HydrationActions.hydrateError({
                    errorMessage: 'Hydrate start error!',
                });
            })
        )
    );

    serialize$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    HydrationActions.hydrateOk,
                    HydrationActions.hydrateError
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

    ngrxOnInitEffects(): Action {
        return HydrationActions.hydrateStart();
    }
}
