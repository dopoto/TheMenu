import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, zip } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';

import { ExternalAuth } from 'src/app/core/models/external-auth';
import { AuthResponse } from 'src/app/core/models/auth-response';
import { logoutStart } from '../../store/actions/auth.actions';
import { AppState } from '../../store/app.state';
import { UserRoles } from '../../models/user-roles';
import { LogService } from '../log/log.service';
import { DemoAuth } from '../../models/demo-auth';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(
        private http: HttpClient,
        private externalAuthService: SocialAuthService,
        private jwtHelper: JwtHelperService,
        private readonly store: Store<AppState>,
        public logService: LogService
    ) {}

    public externalLogin = (route: string, body: ExternalAuth) => {
        return this.http.post<AuthResponse>(route, body);
    };

    public signInWithGoogle$(): Observable<SocialUser> {
        const signIn$ = from(
            this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
        );
        return signIn$.pipe(
            // TODO Add security logging here (new logService.security...)
            switchMap((socialUser) => this.validateExternalAuth$(socialUser))
        );
    }

    public signInWithDemoAccount$(
        demoAppState: AppState
    ): Observable<AppState> {
        return this.validateDemoAuth$(demoAppState);
    }

    public signOutExternal$(): Observable<void> {
        const signOutFromExternalProvider$ = from(
            this.externalAuthService.signOut(true)
        );
        const revokeToken$ = this.http.post('/token/revoke', {});

        return zip(signOutFromExternalProvider$, revokeToken$).pipe(
            tap(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
            }),
            map(() => {})
        );
    }
    
    public signOutDemo$(): Observable<void> {
        const revokeToken$ = this.http.post('/token/revoke', {});
        return revokeToken$.pipe(
            tap(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
            }),
            map(() => {})
        );
    }

    public async tryRefreshingTokens(token: string): Promise<boolean> {
        // Try refreshing tokens using refresh token
        const refreshToken: string = localStorage.getItem('refreshToken');

        if (!token || !refreshToken) {
            return false;
        }

        const credentials = JSON.stringify({
            accessToken: token,
            refreshToken: refreshToken,
        });

        let isRefreshSuccess: boolean;
        try {
            const response = await this.http
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

        if (!isRefreshSuccess) {
            this.store.dispatch(logoutStart());
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
        const decodedToken = this.jwtHelper.decodeToken(token);
        const decodedRoles =
            decodedToken[
                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ];
        this.logService.info(
            `Matching decoded roles ${JSON.stringify(
                decodedRoles
            )} with claim roles ${JSON.stringify(roles)}`
        );
        let intersection = roles.filter((x) => decodedRoles?.includes(x));
        return intersection.length > 0;
    };

    public validateExternalAuth$(
        socialUser: SocialUser
    ): Observable<SocialUser> {
        const externalAuth: ExternalAuth = {
            provider: socialUser.provider,
            idToken: socialUser.idToken,
        };
        return this.http
            .post<AuthResponse>('/accounts/external-login', externalAuth)
            .pipe(
                map((authResponse) => {
                    if (authResponse.isAuthSuccessful) {
                        localStorage.setItem('token', authResponse.token);
                        localStorage.setItem(
                            'refreshToken',
                            authResponse.refreshToken
                        );
                        return socialUser;
                    } else {
                        return null;
                    }
                })
            );
    }

    public validateDemoAuth$(demoAppState: AppState): Observable<AppState> {
        const demoAuth: DemoAuth = {
            email: demoAppState.auth.user.email,
        };
        return this.http
            .post<AuthResponse>('/accounts/demo-login', demoAuth)
            .pipe(
                map((authResponse) => {
                    if (authResponse.isAuthSuccessful) {
                        localStorage.setItem('token', authResponse.token);
                        localStorage.setItem(
                            'refreshToken',
                            authResponse.refreshToken
                        );
                        demoAppState.auth.isDemo = true;
                        return demoAppState;
                    } else {
                        return null;
                    }
                })
            );
    }
}
