import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ClientSideUser } from 'api/generated-models';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { LogService } from 'src/app/core/services/log/log.service';

import { loginError, loginFail, loginOk } from '../actions/auth.actions';
import { AuthActionTypes } from '../actions/_app-action-types';
import { AppState } from '../app.state';
import { selectIsDemo } from '../selectors/user.selectors';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
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
                                photoUrl: socialUser.photoUrl,
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
            withLatestFrom(() => this.store.select(selectIsDemo)),
            mergeMap((s) => {
                debugger;
                return this.authService.signOutExternal$().pipe(
                    map(() => {
                        return {
                            type: AuthActionTypes.logoutOk,
                        };
                    }),
                    catchError(() => EMPTY) //TODO
                );
            })
        )
    );
}
