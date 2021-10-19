import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { DemoService } from '../../services/demo/demo.service';
import { LogService } from '../../services/log/log.service';
import {
    AuthActionTypes,
    loginError,
    loginFail,
    loginSuccess,
} from '../actions/auth.actions';
import { ManagerDemoActionTypes, managerDemoSuccess } from '../actions/manager-demo.actions';

@Injectable()
export class ManagerDemoEffects {
    constructor(
        private actions$: Actions,
        private demoService: DemoService,
        private logService: LogService
    ) {}

    managerDemoStarted$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ManagerDemoActionTypes.MANAGER_DEMO_STARTED),
            mergeMap(() =>
                this.demoService.getDemoData$().pipe(
                    map((appState) => {
                        return managerDemoSuccess({appState});
                    }),
                    // catchError((error) => {
                    //     this.logService.error(error);
                    //     const err = loginError({
                    //         errorMessage: 'Login error!!!!',
                    //     });
                    //     return of(err);
                    // })
                )
            )
        )
    );
}
