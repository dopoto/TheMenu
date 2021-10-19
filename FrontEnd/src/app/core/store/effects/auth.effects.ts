import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LogService } from '../../services/log/log.service';
import {
    loginError,
    loginFail,
    loginOk,
} from '../actions/auth.actions';
import { AuthActionTypes } from '../actions/_app-action-types';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private logService: LogService
    ) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.loginStart),
            mergeMap(() =>
                this.authService.signInWithGoogle$().pipe(
                    map((socialUser) => {
                        if (socialUser !== null) {
                            return loginOk({ socialUser });
                        } else {
                            return loginFail({
                                errorMessage: 'Login failed!',
                            });
                        }
                    }),
                    catchError((error) => {
                        this.logService.error(error);
                        const err = loginError({
                            errorMessage: 'Login error!!!!',
                        });
                        return of(err);
                    })
                )
            )
        )
    );

    logInSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActionTypes.loginOk),
                tap(() => {})
            ),
        { dispatch: false }
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.logoutStart),
            mergeMap(() =>
                this.authService.signOutExternal$().pipe(
                    map(() => {
                        return {
                            type: AuthActionTypes.logoutOk,
                        };
                    }),
                    catchError(() => EMPTY) //TODO
                )
            )
        )
    );

    // logInFailure$ = createEffect(
    //   () =>
    //     this.actions$.pipe(
    //       ofType(AuthActionTypes.loginFailURE),
    //       tap(() => {})
    //     ),
    //   { dispatch: false }
    // );
}
