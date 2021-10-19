import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { DemoService } from '../../services/demo/demo.service';
import { LogService } from '../../services/log/log.service';
import { loginSuccess } from '../actions/auth.actions';
import { DemoActionTypes, DEMO_START_ERRORED, DEMO_START_SUCCEEDED } from '../actions/demo.actions';

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
                        loginSuccess({socialUser: appState.auth.user});
                    }),
                    map((appState) => {
                        return DEMO_START_SUCCEEDED({appState});
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

    // logInSuccess$ = createEffect(
    //     () =>
    //         this.actions$.pipe(
    //             ofType(AuthActionTypes.LOGIN_SUCCESS),
    //             tap(() => {})
    //         ),
    //     { dispatch: false }
    // );

    // logout$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(AuthActionTypes.LOGOUT_STARTED),
    //         mergeMap(() =>
    //             this.authService.signOutExternal$().pipe(
    //                 map(() => {
    //                     return {
    //                         type: AuthActionTypes.LOGOUT_SUCCESS,
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
    //       ofType(AuthActionTypes.LOGIN_FAILURE),
    //       tap(() => {})
    //     ),
    //   { dispatch: false }
    // );
}
