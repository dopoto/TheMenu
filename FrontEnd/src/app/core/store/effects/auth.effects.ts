import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    catchError,
    EMPTY,
    map,
    mergeMap,
    Observable,
    of,
    switchMap,
    tap,
} from 'rxjs';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import {
    AuthActionTypes,
    LogIn,
    LogInFailure,
    LogInSuccess,
} from '../actions/user.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private router: Router
    ) {}

    logIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.LOGIN),
            switchMap(() => {
                return this.authService.signInWithGoogle$().pipe(
                    map((data) => {
                        return new LogInSuccess({
                            token: 'TODO TOkEN',
                            email: data.email,
                        });
                    }),
                    catchError((error) => {
                        return of(new LogInFailure({ error: error }));
                    })
                );
            })
        )
    );

    // LogIn$ = createEffect(() => {
    //     .ofType(AuthActionTypes.LOGIN)
    //     .map((action: LogIn) => action.payload)
    //     .switchMap((payload) => {
    //         return this.authService
    //             .logIn(payload.email, payload.password)
    //             .map((user) => {
    //                 console.log(user);
    //                 return new LogInSuccess({
    //                     token: user.token,
    //                     email: payload.email,
    //                 });
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //                 return of(new LogInFailure({ error: error }));
    //             });
    //     });

    // logInSuccess$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(AuthActionTypes.LOGIN_SUCCESS),
    //         tap((user) => {
    //             // localStorage.setItem('token', user.payload.token);
    //             // this.router.navigateByUrl('/');
    //           }),
    //           {dispatch: false}
    //         )
    //     )
    // );

    logInSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActionTypes.LOGIN_SUCCESS),
                tap((user) => {
                    debugger;
                    localStorage.setItem('token', 'TODO TOKEN');
                    this.router.navigateByUrl('/');
                })
            ),
        { dispatch: false }
    );

    logInFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActionTypes.LOGIN_FAILURE),
                tap((user) => {
                    debugger;
                })
            ),
        { dispatch: false }
    );
}
