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
import { AppState } from '../../store/app.states';
import { loginFailure, loginSuccess } from '../../store/actions/user.actions';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(
        private _http: HttpClient,
        private _externalAuthService: SocialAuthService,
        private store: Store<AppState>
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
                        token: res.token,
                        user: socialUser,
                    };
                    this.store.dispatch(loginSuccess({authData}));
                } else {
                    this.signOutExternal();
                }
            },
            error: () => {
                this.store.dispatch(loginFailure({errorMessage: 'Failed to log in'}));
                this.signOutExternal();
            },
        });
    }

    public signOutExternal = () => {
        localStorage.removeItem('token');
        this._externalAuthService.signOut();
        // TODO dispatch logout
    };

    public externalLogin = (route: string, body: ExternalAuth) => {
        return this._http.post<AuthResponse>(route, body);
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

    public signInWithGoogle$(): Observable<SocialUser> {
        return of(<SocialUser>{email: 'x@x.com'});
    }
}
