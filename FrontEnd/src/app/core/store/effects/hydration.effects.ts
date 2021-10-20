import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
    catchError,
    distinctUntilChanged,
    map,
    mergeMap,
    switchMap,
    tap,
} from 'rxjs/operators';

import { DemoService } from '../../services/demo/demo.service';
import { LogService } from '../../services/log/log.service';
import { loginOk } from '../actions/auth.actions';
import * as HydrationActions from '../actions/hydration.actions';
import { hydrateError, hydrateOk } from '../actions/hydration.actions';
import { AppState } from '../app.state';

@Injectable()
export class HydrationEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private demoService: DemoService,
        private logService: LogService
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

    hydrateManagerDemo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HydrationActions.hydrateManagerDemoStart),
            mergeMap(() =>
                this.demoService.getDemoData$().pipe(
                    tap((appState) => {
                        loginOk({ socialUser: appState.auth.user });
                    }),
                    map((appState) => {
                        return hydrateOk({ state: appState });
                    }),
                    catchError((error) => {
                        this.logService.error(error);
                        const err = hydrateError({
                            errorMessage: 'Demo start error!',
                        });
                        return of(err);
                    })
                )
            )
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
