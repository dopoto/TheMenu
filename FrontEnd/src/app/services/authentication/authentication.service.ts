import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { ExternalAuth } from 'src/app/models/external-auth';
import { RegistrationResponse } from 'src/app/models/registration-response';
import { UserForRegistration } from 'src/app/models/user-for-registration';
import { UserForAuthentication } from 'src/app/models/user-for-authentication';
import { AuthResponse } from 'src/app/models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _authChangeSub = new Subject<boolean>();
  public authChanged = this._authChangeSub.asObservable();

  constructor(
    private _http: HttpClient,
    private _externalAuthService: SocialAuthService
  ) {}

  public registerUser = (route: string, body: UserForRegistration) => {
    return this._http.post<RegistrationResponse>(route, body);
  };

  public loginUser = (route: string, body: UserForAuthentication) => {
    return this._http.post<AuthResponse>(route, body);
  };

  public logout = () => {
    localStorage.removeItem('token');
    this.sendAuthStateChangeNotification(false);
  };

  public signInWithGoogle = () => {
    return this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  };

  public signOutExternal = () => {
    //this._externalAuthService.signOut();
  };

  public externalLogin = (route: string, body: ExternalAuth) => {
    return this._http.post<AuthResponse>(route, body);
  };

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  };

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');

    //return token && !this._jwtHelper.isTokenExpired(token);
    return false;
  };

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem('token');
    const decodedToken = ''; //this._jwtHelper.decodeToken(token);
    const role =
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];

    return role === 'Administrator';
  };
}
