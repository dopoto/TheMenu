import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AuthActionTypes, loginSuccess } from '../actions/user.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private router: Router
    ) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.LOGIN_STARTED),
            mergeMap(() =>
                this.authService.signInWithGoogle$().pipe(
                    map((socialUser) => {
                        return {
                            type: AuthActionTypes.LOGIN_SUCCESS,
                            socialUser: socialUser,
                        };
                    }),
                    catchError(() => EMPTY) //TODO
                )
            )
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
                        type: AuthActionTypes.LOGOUT_SUCCESS
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
