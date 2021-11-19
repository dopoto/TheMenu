import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
    catchError,
    exhaustMap,
    map,
    mergeMap,
    switchMap,
    tap,
    withLatestFrom,
} from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { LogService } from 'src/app/core/services/log/log.service';
import { DemoService } from 'src/app/core/services/demo/demo.service';
import { exitDemoError, initDemoOk } from '../actions/demo.actions';
import { DemoActionTypes } from '../actions/_app-action-types';
import * as actions from '../actions/demo.actions';
import { hydrateOk } from '../actions/hydrate.actions';

@Injectable()
export class DemoEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private demoService: DemoService,
        private router: Router,
        private logService: LogService
    ) {}

    // initDemo$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(actions.initDemo),
    //         switchMap((actionPayload) => {
    //             return this.authService.signInWithDemoAccount$().pipe(
    //                 map((authenticatedDemoUserAppState) => {
    //                     debugger;
    //                     return initDemoOk({
    //                         demoAppState: authenticatedDemoUserAppState,
    //                         demoSettings: actionPayload.demoSettings,
    //                     });
    //                 })
    //             );
    //         }),
    //         map((s, ss) => {
    //             return s;
    //         })
    //     )
    // );

    initDemo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.initDemo),
            switchMap((actionPayload) => {
                return this.authService.signInWithDemoAccount$().pipe(
                    map((authenticatedDemoUserAppState) => {
                        return {
                            demoAppState: authenticatedDemoUserAppState,
                            demoSettings: actionPayload.demoSettings,
                        };
                    })
                );
            }),
            tap(() => {
                this.router.navigate(['/managers']);
            }),
            map(data => hydrateOk({state: data.demoAppState}))
        )
    );

    initDemoOk$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.initDemoOk),
            // map((actionPayload) => {
            //     return hydrateOk({ state: actionPayload.demoAppState });
            // }),
            tap(() => {
                this.router.navigate(['/managers']);
            })
        ), {dispatch: false}
    );

    // withLatestFrom(
    //     this.demoService.getDemoData$().pipe(
    //         map(demoAppState => {
    //             return this.authService.signInWithDemoAccount$(demoAppState);
    //         })
    //     )
    // ),
    // map(([demoSettings, demoAppState]) => {
    //     // debugger;
    //     // this.router.navigate(['/managers']);
    //     // return initDemoOk();
    //     //loginOk({ clientSideUser: demoAppState.auth.user }),
    //     return initDemoOk({ demoAppState, demoSettings });
    // })

    // this.demoService.getDemoData$().pipe(
    //     // TODO Save current user state to local storage (to restore it when exiting demo)
    //     switchMap((demoAppState) => {
    //         loginOk({ clientSideUser: demoAppState.auth.user });
    //         initDemo({
    //             simulateCustomersActivity:
    //                 props.simulateCustomersActivity,
    //             simulateServersActivity:
    //                 props.simulateServersActivity,
    //         });
    //         this.router.navigate(['/managers']);
    //         return this.authService.signInWithDemoAccount$(
    //             demoAppState
    //         );
    //     }),
    //     // switchMap((appState) => {
    //     //     debugger;
    //     //     loginOk({ clientSideUser: appState.auth.user });
    //     // }),
    //     // tap((appState) => {
    //     //     loginOk({ clientSideUser: appState.auth.user });
    //     // }),
    //     // tap(() => {
    //     //     debugger;
    //     //     initDemo({
    //     //         simulateCustomersActivity:
    //     //             props.simulateCustomersActivity,
    //     //         simulateServersActivity:
    //     //             props.simulateServersActivity,
    //     //     });
    //     // }),
    //     map((appState) => {
    //         return hydrateOk({ state: appState });
    //     }),
    //     // tap(() => this.router.navigate(['/managers'])),
    //     catchError((error) => {
    //         this.logService.error(error);
    //         const err = hydrateError({
    //             errorMessage: 'Demo start error!',
    //         });
    //         return of(err);
    //     })
    // )
    //)
    //  )
    // );

    exitDemo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.exitDemo),
            mergeMap(() =>
                this.authService.signOutDemo$().pipe(
                    map(() => {
                        return {
                            type: DemoActionTypes.exitDemoOk,
                        };
                    }),
                    catchError((error) => {
                        this.logService.error(error);
                        const err = exitDemoError({
                            errorMessage: 'Exit demo error!!!!',
                        });
                        return of(err);
                    })
                )
            )
        )
    );

    exitDemoOk$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.exitDemoOk),
                tap(() => {
                    this.router.navigate(['/home']);
                })
            ),
        { dispatch: false }
    );

    //TODO exitdemoError

    // logInFailure$ = createEffect(
    //   () =>
    //     this.actions$.pipe(
    //       ofType(AuthActionTypes.loginFailURE),
    //       tap(() => {})
    //     ),
    //   { dispatch: false }
    // );
}
