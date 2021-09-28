import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { take } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ExternalAuth } from './models/external-auth';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(http: HttpClient, public authService: AuthenticationService) {
    http
      .get<number>(environment.apiEndpoint + '/diagnose/app-health')
      .pipe(take(1))
      .subscribe({
        next: (data: number) => (this.appHealth = data === 1 ? 'OK' : 'Failed'),
        error: (err) => console.log(err), //TODO
      });

    http
      .get<number>(environment.apiEndpoint + '/diagnose/database-health')
      .pipe(take(1))
      .subscribe({
        next: (data: number) => (this.dbHealth = data === 1 ? 'OK' : 'Failed'),
        error: (err) => console.log(err), //TODO
      });
  }

  public externalLogin = () => {
    debugger;
    this.authService.signInWithGoogle().then(
      (res) => {
        debugger;
        const user: SocialUser = { ...res };
        console.log(user);
        const externalAuth: ExternalAuth = {
          provider: user.provider,
          idToken: user.idToken,
        };
        this.validateExternalAuth(externalAuth);
      },
      (error) => console.log(error)
    );
  };

  private validateExternalAuth(externalAuth: ExternalAuth) {
    this.authService
      .externalLogin('/accounts/external-login', externalAuth)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.authService.sendAuthStateChangeNotification(
            res.isAuthSuccessful
          );
          //this._router.navigate([this._returnUrl]);
        },
        error: () => {
          debugger;
          this.authService.signOutExternal();
        },
      });
  }

  title = 'FrontEnd';
  version = environment.version;
  appHealth = 'Checking...';
  dbHealth = 'Checking...';
}
