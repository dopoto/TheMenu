import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'; //TODO
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { ExternalAuth } from 'src/app/models/external-auth';
import { AuthResponse } from 'src/app/models/auth-response';
import { AuthData } from 'src/app/models/auth-data';
import { AuthState } from 'src/app/models/auth-state';
import { AuthError } from 'src/app/models/auth-error';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private _authDataSub = new Subject<AuthData>();
    public authChanged$ = this._authDataSub.asObservable();

    constructor(
        private _http: HttpClient,
        private _externalAuthService: SocialAuthService
    ) {
        this._externalAuthService.authState.subscribe((user) => {
            console.log('Logged inL ' + JSON.stringify(user));
            const externalAuth: ExternalAuth = {
                provider: user.provider,
                idToken: user.idToken,
            };
            this.validateExternalAuth(user, externalAuth);
        });
    }

    // public logout = () => {
    //     localStorage.removeItem('token');
    //     this.sendAuthStateChangeNotification(false);
    // };

    private validateExternalAuth(
        socialUser: SocialUser,
        externalAuth: ExternalAuth
    ) {
        this.externalLogin('/accounts/external-login', externalAuth).subscribe({
            next: (res) => {
                console.log('Logged in Validated ' + JSON.stringify(res));
                if (res.isAuthSuccessful) {
                    localStorage.setItem('token', res.token);
                    const authData: AuthData = {
                        state: AuthState.SignedInWithGoogle,
                        data: socialUser,
                    };
                    this.sendAuthStateChangeNotification(authData);
                    //TODO this._router.navigate([this._returnUrl]);
                } else {
                    this.signOutExternal();
                }
            },
            error: () => {
                debugger;
                console.log('ERROR');
                const authError: AuthError = {
                    authErrorMessage: 'Error authenticating',
                };
                const authData: AuthData = {
                    state: AuthState.AuthenticationError,
                    data: authError,
                };
                this.sendAuthStateChangeNotification(authData);
                this.signOutExternal();
            },
        });
    }

    // public signInWithGoogle(): void {
    //     this._externalAuthService.signIn(
    //         GoogleLoginProvider.PROVIDER_ID
    //     ).then(
    //         (res) => {
    //             debugger;
    //             const user: SocialUser = { ...res };
    //             console.log(user);
    //             const externalAuth: ExternalAuth = {
    //                 provider: user.provider,
    //                 idToken: user.idToken,
    //             };
    //             this.validateExternalAuth(externalAuth);
    //         },
    //         (error) => {
    //             console.log(error);
    //         }
    //     );
    // }

    public signOutExternal = () => {
        localStorage.removeItem('token');
        const authData: AuthData = {
            state: AuthState.AnonymousUser, data: null
        };
        this.sendAuthStateChangeNotification(authData);
        this._externalAuthService.signOut();
    };

    public externalLogin = (route: string, body: ExternalAuth) => {
        return this._http.post<AuthResponse>(route, body);
    };

    public sendAuthStateChangeNotification = (data: AuthData) => {
        this._authDataSub.next(data);
    };

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

    public signInWithGoogle(): void {
        this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
}
