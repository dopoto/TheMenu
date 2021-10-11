import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, zip } from 'rxjs';
import {
    catchError,
    map,
    switchMap,
    tap,
} from 'rxjs/operators';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';

import { ExternalAuth } from 'src/app/core/models/external-auth';
import { AuthResponse } from 'src/app/core/models/auth-response';
import { UserRoles } from '../../models/user-roles';
import { logoutStarted } from '../../store/actions/auth.actions';
import { AppState } from '../../store/app.state';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(
        private _http: HttpClient,
        private _externalAuthService: SocialAuthService,
        private _jwtHelper: JwtHelperService,
        private readonly store: Store<AppState>
    ) {}

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
            this._externalAuthService.signOut(true)
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

    public async tryRefreshingTokens(token: string): Promise<boolean> {
        // Try refreshing tokens using refresh token
        const refreshToken: string = localStorage.getItem('refreshtoken');

        if (!token || !refreshToken) {
            return false;
        }

        const credentials = JSON.stringify({
            accessToken: token,
            refreshToken: refreshToken,
        });

        let isRefreshSuccess: boolean;
        try {
            const response = await this._http
                .post('/token/refresh', credentials, {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                    }),
                    observe: 'response',
                })
                .toPromise();
            // If token refresh is successful, set new tokens in local storage.
            const newToken = (<any>response).body.accessToken;
            const newRefreshToken = (<any>response).body.refreshToken;
            localStorage.setItem('token', newToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            isRefreshSuccess = true;
        } catch (ex) {
            isRefreshSuccess = false;
        }

        if(!isRefreshSuccess){
            this.store.dispatch(logoutStarted());
        }

        return isRefreshSuccess;
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
 
    /**
     * Returns true if there's at least one match between one role
     * in @roles and one role in the token roles.
     * @param roles
     * @returns
     */
    public hasCurentUserAMatchingRole = (roles: UserRoles[]): boolean => {
        const token = localStorage.getItem('token');
        const decodedToken = this._jwtHelper.decodeToken(token);
        const decodedRoles =
            decodedToken[
                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ];
        let intersection = roles.filter((x) => decodedRoles.includes(x));
        return intersection.length > 0;
    };

    public validateExternalAuth$(
        socialUser: SocialUser
    ): Observable<SocialUser | string> { //TODO Use AuthErrorMessage type instead of string
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
}
