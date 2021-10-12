import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LogService } from '../../services/log/log.service';
import {
    AuthActionTypes,
    loginError,
    loginFail,
    loginSuccess,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private logService: LogService
    ) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.LOGIN_STARTED),
            mergeMap(() =>
                this.authService.signInWithGoogle$().pipe(
                    map((socialUser) => {
                        if (socialUser !== null) {
                            return loginSuccess({ socialUser });
                        } else {
                            return loginFail({
                                errorMessage: 'Login ffailed!',
                            });
                        }
                    })
                )
            ),
            catchError((error) => {
                this.logService.error(error);
                const err = loginError({
                    errorMessage: 'Login error!!!!',
                });
                return of(err);
            })
        )
    );

    logInSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActionTypes.LOGIN_SUCCESS),
                tap(() => {})
            ),
        { dispatch: false }
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.LOGOUT_STARTED),
            mergeMap(() =>
                this.authService.signOutExternal$().pipe(
                    map(() => {
                        return {
                            type: AuthActionTypes.LOGOUT_SUCCESS,
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
    //       ofType(AuthActionTypes.LOGIN_FAILURE),
    //       tap(() => {})
    //     ),
    //   { dispatch: false }
    // );
}
