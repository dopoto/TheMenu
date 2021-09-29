import { Component } from '@angular/core';
import { SocialUser } from 'angularx-social-login';

import { environment } from 'src/environments/environment';
import { ExternalAuth } from './models/external-auth';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public authService: AuthenticationService) {
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

}
