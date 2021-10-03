import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, Observable, of, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'; //TODO
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { ExternalAuth } from 'src/app/core/models/external-auth';
import { AuthResponse } from 'src/app/core/models/auth-response';
import { AuthData } from 'src/app/core/models/auth-data';
import { AppState } from '../../store/app.state';
import { loginFailure, loginSuccess } from '../../store/actions/user.actions';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(
        private _http: HttpClient,
        private _externalAuthService: SocialAuthService,
        private store: Store<AppState>
    ) {}

    // public logout = () => {
    //     localStorage.removeItem('token');
    //     this.sendAuthStateChangeNotification(false);
    // };

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
                    debugger;
                    localStorage.setItem('token', authResponse.token);
                    localStorage.setItem('refreshtoken', authResponse.refreshToken);
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

    public signOutExternal = () => {
        localStorage.removeItem('token');
        this._externalAuthService.signOut();
        // TODO dispatch logout
    };

    public externalLogin = (route: string, body: ExternalAuth) => {
        return this._http.post<AuthResponse>(route, body);
    };

    public signInWithGoogle$(): Observable<SocialUser | string> {
        const signIn$ = from(
            this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
        );
        return signIn$.pipe(
            switchMap((socialUser) =>
                this.validateExternalAuth$(socialUser)
            )
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
