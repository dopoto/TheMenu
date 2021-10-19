import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { DemoService } from '../../services/demo/demo.service';
import { LogService } from '../../services/log/log.service';
import { loginOk } from '../actions/auth.actions';
import {
    DemoActionTypes,
    DEMO_START_ERRORED,
    demoSuccess,
} from '../actions/demo.actions';

@Injectable()
export class DemoEffects {
    constructor(
        private actions$: Actions,
        private demoService: DemoService,
        private logService: LogService
    ) {}

    demoStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DemoActionTypes.DEMO_START_REQUESTED),
            mergeMap(() =>
                this.demoService.getDemoData$().pipe(
                    tap((appState)=> {
                        loginOk({socialUser: appState.auth.user});
                    }),
                    map((appState) => {
                        return demoSuccess({ appState });
                    }),
                    catchError((error) => {
                        this.logService.error(error);
                        const err = DEMO_START_ERRORED({
                            errorMessage: 'Demo start error!',
                        });
                        return of(err);
                    })
                )
            )
        )
    );

    demoStartSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(DemoActionTypes.DEMO_START_SUCCEEDED),
                tap(() => {
                    console.log('demoStartSuccess');
                })
            ),
        { dispatch: false }
    );

    // logInSuccess$ = createEffect(
    //     () =>
    //         this.actions$.pipe(
    //             ofType(AuthActionTypes.loginOk),
    //             tap(() => {})
    //         ),
    //     { dispatch: false }
    // );

    // logout$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(AuthActionTypes.logoutStart),
    //         mergeMap(() =>
    //             this.authService.signOutExternal$().pipe(
    //                 map(() => {
    //                     return {
    //                         type: AuthActionTypes.logoutOk,
    //                     };
    //                 }),
    //                 catchError(() => EMPTY) //TODO
    //             )
    //         )
    //     )
    // );

    // logInFailure$ = createEffect(
    //   () =>
    //     this.actions$.pipe(
    //       ofType(AuthActionTypes.loginFailURE),
    //       tap(() => {})
    //     ),
    //   { dispatch: false }
    // );
}
