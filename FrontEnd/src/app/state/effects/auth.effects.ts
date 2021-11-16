import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientSideUser } from 'api/generated-models';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { LogService } from 'src/app/core/services/log/log.service';

import {
    exitDemoError,
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
        private router: Router,
        private logService: LogService
    ) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.loginStart),
            mergeMap(() =>
                this.authService.signInWithGoogle$().pipe(
                    map((socialUser) => {
                        if (socialUser !== null) {
                            const clientSideUser: ClientSideUser = {
                                id: null,
                                email: socialUser.email,
                                firstName: socialUser.firstName,
                                lastName: socialUser.lastName,
                                photoUrl: socialUser.photoUrl
                            };
                            return loginOk({ clientSideUser });
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

    exitDemo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.exitDemo),
            mergeMap(() =>
                this.authService.signOutDemo$().pipe(
                    map(() => {
                        return {
                            type: AuthActionTypes.exitDemoOk,
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
                ofType(AuthActionTypes.exitDemoOk),
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
