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
export class LocationsEffects {
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
    //             return this.authService.signInWithDemoAccount$(actionPayload.demoSettings).pipe(
    //                 map((authenticatedDemoUserAppState) => {
    //                     return {
    //                         demoAppState: authenticatedDemoUserAppState,
    //                         demoSettings: actionPayload.demoSettings,
    //                     };
    //                 })
    //             );
    //         }),
    //         tap(() => {
    //             this.router.navigate(['/managers']);
    //         }),
    //         map(data => hydrateOk({state: data.demoAppState}))
    //     )
    // );

    // initDemoOk$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(actions.initDemoOk),
    //         // map((actionPayload) => {
    //         //     return hydrateOk({ state: actionPayload.demoAppState });
    //         // }),
    //         tap(() => {
    //             this.router.navigate(['/managers']);
    //         })
    //     ), {dispatch: false}
    // );
}
