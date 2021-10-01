import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AuthActionTypes } from '../actions/user.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  loginStarted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_STARTED),
      switchMap(() =>
        this.authService.signInWithGoogle$().pipe(
          tap((socialUser) => {
debugger;
          }),
          map((socialUser) => ({
            type: AuthActionTypes.LOGIN_SUCCESS,
            payload: socialUser,
          })),
          catchError(() => EMPTY)
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

  logInFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE),
        tap(() => {})
      ),
    { dispatch: false }
  );
}
