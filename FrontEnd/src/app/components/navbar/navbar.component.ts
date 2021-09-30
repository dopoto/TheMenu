import { Component, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { filter, Observable } from 'rxjs';
import { AuthData } from 'src/app/models/auth-data';
import { AuthState } from 'src/app/models/auth-state';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    public user: SocialUser;

    constructor(public authService: AuthenticationService) {}

    ngOnInit(): void {
        //TODO unsubscribe
        this.authService.authChanged$
            .pipe(filter((ad) => ad.state === AuthState.SignedInWithGoogle))
            .subscribe({
                next: (res) => {
                    this.user = <SocialUser>res.data;
                },
                error: () => {
                    this.user = null;
                },
            });
    }

    signInWithGoogle(): void {
        this.authService.signInWithGoogle();
    }

    signOut(): void {
        this.authService.signOutExternal();
    }
}
