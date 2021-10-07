import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, from, Observable, zip } from 'rxjs';
import {
    combineLatest,
    catchError,
    map,
    switchMap,
    withLatestFrom,
    tap,
} from 'rxjs/operators';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { ExternalAuth } from 'src/app/core/models/external-auth';
import { AuthResponse } from 'src/app/core/models/auth-response';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(
        private _http: HttpClient,
        private _externalAuthService: SocialAuthService
    ) {}

    private validateExternalAuth$(
        socialUser: SocialUser
    ): Observable<SocialUser | string> {
        const externalAuth: ExternalAuth = {
            provider: socialUser.provider,
            idToken: socialUser.idToken,
        };
        return this.externalLogin(
            '/accounts/external-login',
            externalAuth
        ).pipe(
            map((authResponse) => {
                if (authResponse.isAuthSuccessful) {
                    localStorage.setItem('token', authResponse.token);
                    localStorage.setItem(
                        'refreshtoken',
                        authResponse.refreshToken
                    );
                    return socialUser;
                } else {
                    return '';
                }
            }),
            catchError(() => {
                return '';
            })
        );
    }

    public externalLogin = (route: string, body: ExternalAuth) => {
        return this._http.post<AuthResponse>(route, body);
    };

    public signInWithGoogle$(): Observable<SocialUser | string> {
        const signIn$ = from(
            this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
        );
        return signIn$.pipe(
            switchMap((socialUser) => this.validateExternalAuth$(socialUser))
        );
    }

    public signOutExternal$(): Observable<void> {
        const signOutFromExternalProvider$ = from(
            this._externalAuthService.signOut()
        );
        const revokeToken$ = this._http.post('/token/revoke', {});

        return zip(signOutFromExternalProvider$, revokeToken$).pipe(
            tap(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshtoken');
            }),
            map(() => {})
        );
    }

    // public isUserAuthenticated = (): boolean => {
    //     const token = localStorage.getItem('token');

    //     //return token && !this._jwtHelper.isTokenExpired(token);
    //     return false;
    // };

    // public isUserAdmin = (): boolean => {
    //     const token = localStorage.getItem('token');
    //     const decodedToken = ''; //this._jwtHelper.decodeToken(token);
    //     const role =
    //         decodedToken[
    //             'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    //         ];

    //     return role === 'Administrator';
    // };
}
